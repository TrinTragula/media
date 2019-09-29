import React from 'react';

class Esame extends React.Component {
    renderButtons = () => {
        if (this.props.loadingSave === this.props.order || this.props.removingItem === this.props.order) {
            return (
                <div className="ui active inline loader"></div>
            );
        }
        if (this.props.uniqueid) {
            let className = "ui basic button red";
            if (this.props.removingItem) className += " disabled";
            return (
                <div className="ui two buttons">
                    <div className={className} onClick={this.props.onRemoveEsame}
                        data-uniqueid={this.props.uniqueid}
                        data-order={this.props.order}>
                        <i className="trash icon center" style={{margin: "0px"}}/>
                    </div>
                </div>
            );
        } else {
            let classNameRemove = "ui basic button grey";
            if (this.props.removingItem) classNameRemove += " disabled";
            let classNameSave = "ui basic button blue";
            if (this.props.loadingSave) classNameSave += " disabled";
            return (
                <div className="ui two buttons">
                    <button className={classNameRemove} onClick={this.props.onRemoveEsame.bind(this)}
                        data-uniqueid={this.props.uniqueid}
                        data-voto={this.props.voto}
                        data-crediti={this.props.crediti}
                        data-order={this.props.order}
                        data-nome={this.props.nome}>
                        <i className="trash icon center" />
                    </button>
                    <button className={classNameSave} onClick={this.props.onSaveEsame.bind(this)}
                        data-uniqueid={this.props.uniqueid}
                        data-voto={this.props.voto}
                        data-crediti={this.props.crediti}
                        data-order={this.props.order}
                        data-nome={this.props.nome}>
                        <i className="save icon" />
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.voto}</td>
                <td>{this.props.crediti}</td>
                <td>{this.props.nome}</td>
                <td>
                    {this.renderButtons()}
                </td>
            </tr >
        );
    }
}

export default Esame;