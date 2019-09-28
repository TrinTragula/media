import React from 'react';
import axios from 'axios';
import MediaSummary from './MediaSummary';
import Loading from './Loading';
import EsamiList from './EsamiList';

class App extends React.Component {
    state = {
        errorMessage: null,
        loading: true,
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

    onSaveForm = async () => {
        await axios.post('/esami', {
            nome: this.state.newNome,
            crediti: this.state.newCrediti,
            voto: this.state.newVoto
        });

        await this.getEsami();

        let esami = this.state.esami.filter(e => e.isTemp !== true);
        this.setState({
            esami: esami,
            newNome: '',
            newCrediti: '',
            newVoto: '',
            canSave: false
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
                    onSaveForm={this.onSaveForm} />
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