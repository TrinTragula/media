import React from 'react';

const MediaSummary = (props) => {
    const crediti = props.esami && props.esami.map(e => e.crediti).reduce((a, b) => a + b, 0);
    const votiPesati = props.esami && props.esami.map(e => e.voto * e.crediti).reduce((a, b) => a + b, 0);
    const media = votiPesati && crediti
        ? votiPesati / crediti
        : 0;
    const mediaInCentesimi = (media * 110) / 30;

    return (
        <div>
            <div className="ui segment" style={{ backgroundColor: 'rgba(223, 229, 231, 0.22)' }}>
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider" />
                    <div className="middle aligned row">
                        <div className="column">
                            <h2>
                                <div className="ui icon big">
                                    <i className="flag checkered icon"></i>
                                </div>
                                {media.toPrecision(4)}
                            </h2>
                        </div>
                        <div className="column">
                            <h2>
                                <div className="ui icon big">
                                    <i className="graduation cap icon"></i>
                                </div>
                                {mediaInCentesimi.toPrecision(5)}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaSummary;