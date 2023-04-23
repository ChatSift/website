import { createContext, useContext, useState } from 'react';
import AlertDialog from '~/components/AlertDialog';
import { Button } from '~/components/Button';
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
							<Button
								buttonType={alertDialogProps.actionButton.danger ? 'danger' : 'callToAction'}
								onPress={() => {
									alertDialogProps.actionButton.onClick?.();
									setAlertDialogProps(null);
								}}
							>
								{alertDialogProps.actionButton.text}
							</Button>
						</div>
					}
					cancelButton={
						<div>
							{/* div is here bc of ref issues */}
							{alertDialogProps.cancelButton && (
								<Button
									buttonType="ghost"
									onPress={() => {
										alertDialogProps.cancelButton?.onClick?.();
										setAlertDialogProps(null);
									}}
								>
									{alertDialogProps.cancelButton.text}
								</Button>
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
