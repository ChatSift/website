import { useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect } from 'react';
import { config, useSpring } from 'react-spring';
import { Backdrop, Menu } from './style';

type SidebarMobileProps = {
	children: React.ReactNode;
	className?: string;
	open: boolean;
	setOpen(open: boolean): void;
};

function SidebarMobile(props: SidebarMobileProps) {
	const restPosition = -300;

	const [{ menuX }, api] = useSpring(() => ({
		menuX: restPosition,
		config: { clamp: true },
		onRest: ({ value: { menuX } }) => {
			if (menuX === restPosition) {
				props.setOpen(false);
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
		if (props.open) {
			open({ cancelled: false });
		}
	}, [props.open, open]);

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
			<Backdrop
				onClick={props.open ? onClick : () => {}}
				style={{
					opacity: menuX.to([0, restPosition], [0.5, 0]),
					display,
					pointerEvents: props.open ? undefined : 'none',
				}}
			/>
			<Menu
				{...bind()}
				style={{
					transform: menuX.to((vStfu) => `translateX(${vStfu}px)`),
					display,
				}}
				className={props.className}
			>
				{props.children}
			</Menu>
		</>
	);
}

export default SidebarMobile;
