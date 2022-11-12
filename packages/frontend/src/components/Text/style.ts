import styled from '@emotion/styled';

export const Heading3 = styled.h3`
	font-weight: 550;
	font-size: 26px;
	line-height: 32px;
	color: ${({ theme }) => theme.colors.text.primary};
`;

const BodyRegular = styled.span`
	font-weight: 450;
	font-size: 18px;
	line-height: 24px;
`;

export const Body = {
	Regular: BodyRegular,
	Bold: styled(BodyRegular)`
		font-weight: 550;
	`,
};

const CaptionRegular = styled.span`
	font-weight: 450;
	font-size: 15px;
	line-height: 18px;
`;

export const Caption = {
	Regular: CaptionRegular,
};
