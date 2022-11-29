import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';
import * as Styles from '~/components/AlertDialog/style';

export type AlertDialogProps = {
	actionButton: ReactNode;
	cancelButton?: ReactNode;
	children: ReactNode;
	isLoading?: boolean;
	open?: boolean;
	title: ReactNode;
	trigger?: ReactNode;
};

function AlertDialog({
	actionButton,
	cancelButton,
	children,
	isLoading = false,
	open = false,
	title,
	trigger,
}: AlertDialogProps) {
	return (
		<RadixAlertDialog.Root open={open}>
			{trigger && <RadixAlertDialog.Trigger>{trigger}</RadixAlertDialog.Trigger>}
			<RadixAlertDialog.Portal>
				<Styles.Overlay />
				<Styles.Content data-loading={isLoading}>
					<Styles.Title>{title}</Styles.Title>
					<Styles.Description>{children}</Styles.Description>
					<Styles.Buttons>
						{cancelButton && <RadixAlertDialog.Cancel asChild>{cancelButton}</RadixAlertDialog.Cancel>}
						<RadixAlertDialog.Action asChild>{actionButton}</RadixAlertDialog.Action>
					</Styles.Buttons>
				</Styles.Content>
			</RadixAlertDialog.Portal>
		</RadixAlertDialog.Root>
	);
}

export default AlertDialog;
