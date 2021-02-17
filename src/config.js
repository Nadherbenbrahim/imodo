import { useMediaQuery } from 'react-responsive';

export const host = 'https://node3.mobilesupportbot.com:5075';

export const trainAgentHost = 'https://node2.mobilesupportbot.com:5051';

// For responsive design
export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}