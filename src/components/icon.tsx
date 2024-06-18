interface IconProps {
    path: string;
    width: number;
    height: number;
}

export const Icon = ({path, width, height}: IconProps) => {
    return <img src={path} alt="Icon" width={width} height={height}/>;
}