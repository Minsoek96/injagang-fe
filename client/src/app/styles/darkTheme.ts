import Theme from './theme';

// TODO : 다크 모드 관련 디자인 색상이 가독성 떨어짐 개선 필요
const darkTheme: Theme = {
  colors: {
    bodyColor: 'RGB(24, 25, 26)',
    primary: '#242526',
    secondary: 'transparent',
    signatureColor: '#ff8800',
    button: '#444',
    logo: '#ffffff',
    text: '#fdfdfd',
    lightText: '#dedede',

    svgColor: '#ffffff',
    svgOnColor: '#ff8800',
    mainLine: '#393A3B',
    mainHover: 'rgba(0, 0, 0, 0.3)',
    textArea: '#414141',

    modalBody: '#ffffffbe',

    dropBoxColor: '#fff',
    red: '#e00000',
    boardText: '#B8B8B8',
    highlightColor: '#FFC375',

    signatureText: '#2D3748',
    signatureHover: '#FF9933',

    emptyGray: '#666666',

    highlight: '#FF9933',
    dark: '#0f1419',
  },
};

export default darkTheme;
