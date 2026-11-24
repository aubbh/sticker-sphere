import pinSvg from '../../assets/icons/pin.svg?raw';

export function Pin({border='#000000', hatching='#000000', size=50}) {
    return (
        <div style={{width: size, height: size}}>
            <span style={{display: 'block', width: '100%', height: '100%', '--border': border,'--hatching': hatching}} dangerouslySetInnerHTML={{ __html: pinSvg }} />
        </div>
    )
}
