import { createContext, useContext, useState } from 'react';
import AlertDialog from '~/components/AlertDialog';
import Button from '~/components/Button';
import type { ProviderProps } from '~/context/props';

type ControlledDialogOptions = {
	actionButton: {
		danger?: boolean;
		onClick?(): void;
		text: string;
	};
	cancelButton?: {
		onClick?(): void;
		text: string;
	};
	description: string;
	title: string;
};

export type DialogController = {
	openAlertDialog(dialogProps: ControlledDialogOptions): void;
};

export const DialogControllerContext = createContext<DialogController>({
	openAlertDialog() {},
});

export function DialogControllerProvider({ children }: ProviderProps) {
	const [alertDialogProps, setAlertDialogProps] = useState<ControlledDialogOptions | null>(null);

	return (
		<DialogControllerContext.Provider
			value={{
				openAlertDialog: setAlertDialogProps,
			}}
		>
			{children}
			{alertDialogProps && (
				<AlertDialog
					open
					actionButton={
						<div>
							{/* div is here bc of ref issues */}
							<Button.Cta
								onPress={() => {
									alertDialogProps.actionButton.onClick?.();
									setAlertDialogProps(null);
								}}
								data-type={alertDialogProps.actionButton.danger ? 'danger' : 'primary'}
							>
								{alertDialogProps.actionButton.text}
							</Button.Cta>
						</div>
					}
					cancelButton={
						<div>
							{/* div is here bc of ref issues */}
							{alertDialogProps.cancelButton && (
								<Button.Ghost
									onPress={() => {
										alertDialogProps.cancelButton?.onClick?.();
										setAlertDialogProps(null);
									}}
								>
									{alertDialogProps.cancelButton.text}
								</Button.Ghost>
							)}
						</div>
					}
					title={alertDialogProps.title}
				>
					{alertDialogProps.description}
				</AlertDialog>
			)}
		</DialogControllerContext.Provider>
	);
}

const useDialogController = () => useContext(DialogControllerContext);

export default useDialogController;
