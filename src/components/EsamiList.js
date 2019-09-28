import React from 'react';
import Esame from './Esame';
import InsertEsameForm from './InsertEsameForm';

const EsamiList = (props) => {
    return (
        <div className="ui segment">
            <InsertEsameForm
                onNewVotoChanghe={props.onNewVotoChanghe}
                onNewCreditiChange={props.onNewCreditiChange}
                onNewNomeChange={props.onNewNomeChange}
                newNome={props.newNome}
                newCrediti={props.newCrediti}
                newVoto={props.newVoto}
                canSave={props.canSave}
                onSaveForm={props.onSaveForm} />
            <br></br>
            <table className="ui very basic center aligned celled table fixed single line unstackable ">
                <thead>
                    <tr>
                        <th>Voto</th>
                        <th>Crediti</th>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.esami.map((esame, i) =>
                        <Esame nome={esame.nome} voto={esame.voto} crediti={esame.crediti} uniqueid={esame.id} key={i} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EsamiList;