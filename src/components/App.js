import React from 'react';
import axios from 'axios';
import MediaSummary from './MediaSummary';
import Loading from './Loading';
import EsamiList from './EsamiList';

class App extends React.Component {
    state = {
        errorMessage: null,
        loading: true,
        loadingSave: false,
        newNome: '',
        newCrediti: '',
        newVoto: ''
    }

    onNewNomeChange = async (e) => {
        await this.setState({ newNome: e.target.value });
        this.updateTempEsami();
    }

    onNewCreditiChange = async (e) => {
        await this.setState({ newCrediti: parseInt(e.target.value) || '' });
        this.updateTempEsami();
    }

    onNewVotoChanghe = async (e) => {
        await this.setState({ newVoto: parseInt(e.target.value) || '' });
        this.updateTempEsami();
    }

    updateTempEsami = () => {
        let esami = this.state.esami.filter(e => e.isTemp !== true);
        let hasAll = this.state.newVoto && this.state.newCrediti;
        if (hasAll) {
            esami.unshift({
                nome: this.state.newNome || 'Esame temporaneo',
                voto: this.state.newVoto,
                crediti: this.state.newCrediti,
                isTemp: true
            });
        }
        this.setState({
            esami: esami,
            canSave: hasAll && this.state.newNome
        });
    }

    onRemoveEsame = async (e) => {
        let { uniqueid, order } = e.currentTarget.dataset
        order = parseInt(order);

        if (this.state.removingItem) return;
        await this.setState({
            removingItem: order
        });

        if (uniqueid) {
            await axios.delete('/esami', {
                data: {
                    id: uniqueid
                }
            });
        }
        let esami = this.state.esami;
        esami.splice(order, 1);

        this.setState({
            esami: esami,
            removingItem: false
        })
    }

    onSaveEsame = async (e) => {
        let { voto, crediti, nome, order } = e.currentTarget.dataset;
        order = parseInt(order);

        if (this.state.loadingSave) return;
        await this.setState({
            loadingSave: order
        });

        const result = await axios.post('/esami', {
            nome: nome,
            crediti: crediti,
            voto: voto
        });
        const esami = this.state.esami;
        const esame = esami[order];
        esame.id = result.data.lastID;

        if (esame.isTemp) {
            esame.isTemp = false;
            this.setState({
                loadingSaveForm: false,
                newNome: '',
                newCrediti: '',
                newVoto: '',
                canSave: false
            });
        }

        this.setState({
            esami: esami,
            loadingSave: false
        });
    }

    onSaveForm = async () => {
        if (this.state.loadingSaveForm) return;

        await this.setState({
            loadingSaveForm: true
        });

        this.saveTempEsame();
        this.setState({
            loadingSaveForm: false,
            newNome: '',
            newCrediti: '',
            newVoto: '',
            canSave: false
        });
    }

    saveTempEsame = async () => {
        let esami = this.state.esami.filter(e => e.isTemp !== true);
        let tempEsame = this.state.esami.find(e => e.isTemp === true);
        if (tempEsame) tempEsame.isTemp = false;
        await this.setState({
            esami: [tempEsame, ...esami]
        });
    }

    getEsami = async () => {
        const data = await axios.get('/esami');
        this.setState({
            esami: data.data,
            loading: false
        });
    }

    async componentDidMount() {
        try {
            this.getEsami();
        } catch {
            this.setState({
                errorMessage: 'Impossibile trovare lista esami'
            });
        }
    }

    renderBody = () => {
        return (
            <div className="ui container" style={{ marginTop: '5vh' }}>
                <MediaSummary esami={this.state.esami} />
                <EsamiList esami={this.state.esami}
                    onNewVotoChanghe={this.onNewVotoChanghe}
                    onNewCreditiChange={this.onNewCreditiChange}
                    onNewNomeChange={this.onNewNomeChange}
                    newNome={this.state.newNome}
                    newCrediti={this.state.newCrediti}
                    newVoto={this.state.newVoto}
                    canSave={this.state.canSave}
                    loadingSave={this.state.loadingSave}
                    loadingSaveForm={this.state.loadingSaveForm}
                    removingItem={this.state.removingItem}
                    onSaveForm={this.onSaveForm}
                    onSaveEsame={this.onSaveEsame}
                    onRemoveEsame={this.onRemoveEsame} />
            </div>
        )
    }

    renderLoading = () => {
        return <Loading message="Caricamento..." />;
    }

    renderContent = () => {
        if (this.state.loading) {
            return this.renderLoading();
        } else {
            return this.renderBody();
        }
    }

    render() {
        return this.renderContent();
    }
}

export default App;