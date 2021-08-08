import React, { useState, useEffect } from 'react';
import api from './api';

import './style.css';

const App = () => {

	const [dadosAlbum, setDadosAlbum] = useState([]);
	const [nomeAlbum, setNomeAlbum] = useState('');
	const [stateImagensAlbum, setStateImagensAlbum] = useState([]);
	const [idAlbumAtual, setIdAlbumAtual] = useState(false);
	
    useEffect (() => {
		getDadosApi();
	}, []);
	
	 const getImagens =  async (albumID = idAlbumAtual) => {
	 	const response = await api.get(`https://api.imgur.com/3/album/${albumID}/images`, {
	 		headers: { 
	 			'Authorization': ' Client-ID 61d72d7bd9d199f'
	 		}
	 	});
		if(response.status === 200) {
			setStateImagensAlbum(response.data.data);
		} else {
			setStateImagensAlbum([]);
			alert('Nenhuma imagem a ser exibida');
		}

	 }

	const getDadosApi = async () => {

		const response = await api.get('/account/me/albums', {
			headers: { 
				'Authorization': ' Bearer 1cd987e91f5b331704ac5639f3083c132dfaac8c'
			}
		})

		if(response.status === 200) {
			setDadosAlbum(response.data.data);
		} else {
			setDadosAlbum([]);
			alert('Não foi possivel carregar a lista');
		}		
	}

	const postAlbumApi = async () => {
		const response = await api.post(`/album`, {
			title: `${nomeAlbum}`
			
		}, 
		{ 
		headers: {
				'Authorization': ' Bearer 1cd987e91f5b331704ac5639f3083c132dfaac8c'
			}
		})
		if(response.status === 200) {
			getDadosApi();
		} else {
			alert('Não foi possivel criar o album');
		}
	}

	const delDadosApi = async (apagaArquivo) => {
		const response = await api.delete(`/album/${apagaArquivo}`, {
			headers: { 
				'Authorization': ' Client-ID 61d72d7bd9d199f'
			}
		})
		if(response.status === 200) {
			getDadosApi();
		} else {
			alert('Não foi possivel apagar o album');
		}
	}

	const deImagem = async (idImagem) => {
		const response = await api.delete(`/image/${idImagem}`, {
			headers: { 
				'Authorization': 'Bearer 1cd987e91f5b331704ac5639f3083c132dfaac8c'
			}
		});
		if(response.status === 200) {
			alert('Imagem deletada com sucesso');
			getDadosApi();
		} else {
			alert('Não foi possível apagar a imagem');
		}
	}
	
	const enviarImagem = async (evento, idAlbum) => {
		const imagem = evento.target.files[0];
		const objetoEnviar = new FormData();

		objetoEnviar.append('image', imagem);
		objetoEnviar.append('title', imagem.name);
		objetoEnviar.append('type', imagem.type);
		objetoEnviar.append('album', idAlbum);

		const response = await api.post('/image', objetoEnviar, {
			headers: { 
				'Authorization': 'Bearer 1cd987e91f5b331704ac5639f3083c132dfaac8c	'
			}
		});

		if(response.status === 200) {
			getDadosApi();
			alert('Imagem enviada com sucesso');
			getImagens(idAlbumAtual);
		} else {
			alert('Não foi possível enviar a imagem');
		}
	}
	
    return(
		<div className="container">
			<h3>Gerenciar album Imgur</h3>
			<div className="create-album">
				<input
					type = 'search' 
					value = {nomeAlbum}
					onChange = {e => {
						setNomeAlbum(e.target.value);
					}}
				/>
				<button 
					type="button" 
					onClick={postAlbumApi}>
					Criar album
				</button>
			</div>
			<div className="card-geral">
				<div className="card-barra">
					{dadosAlbum.map((val, key) => {
						return (
							<div className="card-album-item" key={key}>
								<div className="card-album-inner">
									<div><strong>Album:</strong> {val.title}</div>
									<div>{val.images_count} imagens</div>
									<button 
										type="button" 
										onClick={() => {
											setIdAlbumAtual(val.id);
											getImagens(val.id);
										}}>
										listar imagens
									</button>

									<button 
										type="button" 
										onClick={() => delDadosApi(val.deletehash)}>
										apagar album
									</button>

									<label className="botao">
										Enviar imagem
										<input
											type="file"
											onChange={evento => {
												setIdAlbumAtual(val.id);
												enviarImagem(evento, val.id);
											}}
										/>
									</label>
								</div>
							</div>
						)
					})}
				</div>
				<div className="card-imagens-album">
					{!stateImagensAlbum.length ? (
						<div>Nenhum album selecionado.</div>
					) : (
						stateImagensAlbum.map((val, key) => {
							return (
								<div className="card-imagem-box" key={key}>
									<div className="card-imagem">
										<div><img src={val.link} alt="imagem" /></div>
										<div><button onClick={() => {
											deImagem(val.id);
										}}>Apagar imagem</button></div>
									</div>
								</div>
							)
						})
					)}
				</div>
			</div>
    	</div>
    )
}	

export default App;
