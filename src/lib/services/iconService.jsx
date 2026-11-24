import pinSvg from '../../assets/icons/pin.svg?raw';

export function Pin({ border = '#000000', hatching = '#000000', size = 50 }) {
    return (
        <span
            className="svg-icon"
            style={{
                display: 'inline-block',
                width: size,
                height: size,
                flexShrink: 0,
                '--border': border,
                '--hatching': hatching
            }}
            dangerouslySetInnerHTML={{ __html: pinSvg }}
        />
    )
}
