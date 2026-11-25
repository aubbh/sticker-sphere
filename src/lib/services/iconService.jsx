import pinSvg from '../../assets/icons/pin.svg?raw';
import stickerSvg from '../../assets/icons/sticker.svg?raw';
import profileSvg from '../../assets/icons/profile.svg?raw';

export function Icons({ type = pin, border = '#000000', hatching = '#000000', size = 50 }) {
    var typeSvg
    switch (type) {
        case 'map':
        case 'pin':
            typeSvg = pinSvg;
            break;
        case 'sticker':
            typeSvg = stickerSvg;
            break;
        case 'profile':
            typeSvg = profileSvg;
            break;
        default:
            console.log(`${type} is not a correct icon type, defaulting to sticker`);
            typeSvg = stickerSvg;
            break;
    }
    return (
        <div style={{ width: size, height: size }}>
            <span style={{ flexShrink: 0, display: 'inline-block', width: size, height: size, '--border': border, '--hatching': hatching }} dangerouslySetInnerHTML={{ __html: typeSvg }} />
        </div>
    )
}
