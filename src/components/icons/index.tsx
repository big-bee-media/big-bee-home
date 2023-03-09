import { CSSProperties, SVGAttributes } from "react";
import dynamic from 'next/dynamic';
import { IconContext } from '@react-icons/all-files';

interface IProps {
    icon: any;
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
}


const DynamicFAIcon = ({ icon, ...props }: IProps) => {
    const [iconType, iconName] = icon.split('/');
    const Icon = dynamic(async () => {
        const m = await import(`@react-icons/all-files/fi/${iconName}`)
        return m[iconName];
    }, {
        ssr: false
    })

    const value: IconContext = {
        color: props.color,
        size: props.size,
        className: props.className,
        style: props.style,
        attr: props.attr
    };

    return (
        <IconContext.Provider value={value} >
            <Icon />
        </IconContext.Provider>
    );
};

export default DynamicFAIcon;