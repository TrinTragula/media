import React from 'react';

class Esame extends React.Component {
    renderButtons = () => {
        if (this.props.uniqueid) {
            return (
                <div className="ui two buttons">
                    <div className="ui basic button red" onClick={this.props.onRemove}>
                        <i className="trash icon center" />Elimina
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ui two buttons"
                >
                    <button className="ui basic button grey" onClick={this.props.onRemove}>
                        <i className="trash icon center" />
                    </button>
                    <button className="ui basic button blue" onClick={this.props.onSave}>
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