import React from 'react';

class InsertEsameForm extends React.Component {
    render() {
        return (
            <div className="ui form">
                <div className="fields">
                    <div className="field">
                        <label>Voto</label>
                        <input type="number" max="30" placeholder="Voto" value={this.props.newVoto} onChange={this.props.onNewVotoChanghe} />
                    </div>
                    <div className="field">
                        <label>Crediti</label>
                        <input type="number" max="180" placeholder="Crediti" value={this.props.newCrediti} onChange={this.props.onNewCreditiChange} />
                    </div>
                    <div className="field">
                        <label>Nome</label>
                        <input type="text" placeholder="Nome" value={this.props.newNome} onChange={this.props.onNewNomeChange} />
                    </div>
                    {this.props.canSave
                        ? <div className="field">
                            <label>&nbsp;</label>
                            <button className="ui basic green button" type="submit" onClick={this.props.onSaveForm}>Memorizza</button>
                        </div>
                        : ''
                    }
                </div>
            </div>
        );
    }
}

export default InsertEsameForm;