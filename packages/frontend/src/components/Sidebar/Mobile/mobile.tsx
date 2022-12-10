import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect } from 'react';
import { config, useSpring } from 'react-spring';
import * as Styles from './style';
import Button from '~/components/Button';
import Logo from '~/components/Header/components/Logo';
import * as HeaderStyles from '~/components/Header/style';
import * as LoggedInUser from '~/components/LoggedInUser';
import SvgHamburger from '~/svg/SvgHamburger';

type SidebarMobileProps = {
	children: React.ReactNode;
	className?: string;
};

function SidebarMobile(props: SidebarMobileProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const restPosition = -300;

	const [{ menuX }, api] = useSpring(() => ({
		menuX: restPosition,
		config: { clamp: true },
		onRest: ({ value: { menuX } }) => {
			if (menuX === restPosition) {
				setIsOpen(false);
			}
		},
	}));

	const open = useCallback(
		({ cancelled }: { cancelled: boolean }) => {
			api.start({
				menuX: 0,
				immediate: false,
				config: cancelled ? config.wobbly : config.stiff,
			});
		},
		[api],
	);

	useEffect(() => {
		if (isOpen) {
			open({ cancelled: false });
		}
	}, [isOpen, open]);

	function close() {
		api.start({
			menuX: restPosition,
			immediate: false,
			config: config.stiff,
		});
	}

	const bind = useDrag(
		({ last, direction: [dx], velocity: [vx], movement: [mx] }) => {
			if (last) {
				if (mx < restPosition / 2 || (vx > 0.5 && dx < 0)) {
					close();
				} else {
					open({ cancelled: true });
				}

				return;
			}

			api.start({ menuX: mx, immediate: true });
		},
		{
			from: () => [menuX.get(), 0],
			filterTaps: true,
			bounds: { right: 0 },
		},
	);

	function onClick() {
		console.log('close');
		close();
	}

	const display = menuX.to((py) => (py > restPosition ? 'flex' : 'none'));

	return (
		<>
			<HeaderStyles.MobileNav>
				<HeaderStyles.HeaderContent>
					<Logo />
					<Button.Ghost
						style={{ padding: 12 }}
						onPress={() => setIsOpen(!isOpen)}
						title="open menu"
						aria-expanded={isOpen}
						aria-controls="menu"
						aria-haspopup="true"
					>
						<SvgHamburger themeColor={(theme) => theme.colors.text.secondary} />
					</Button.Ghost>
				</HeaderStyles.HeaderContent>
			</HeaderStyles.MobileNav>
			<Styles.Backdrop
				onClick={isOpen ? onClick : () => {}}
				style={{
					opacity: menuX.to([0, restPosition], [0.5, 0]),
					display,
					pointerEvents: isOpen ? undefined : 'none',
				}}
			/>
			<Styles.Menu
				{...bind()}
				style={{
					transform: menuX.to((value) => `translateX(${value}px)`),
					display,
				}}
				className={props.className}
			>
				<Styles.MainContent>{props.children}</Styles.MainContent>
				<Styles.MobileUser data-mobile-open={isOpen}>
					<LoggedInUser.Mobile hasDiscriminator={false} />
				</Styles.MobileUser>
			</Styles.Menu>
		</>
	);
}

export default SidebarMobile;
