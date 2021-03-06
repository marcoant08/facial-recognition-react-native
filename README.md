# facial-recognition-react-native

Aplicativo de verificação facial.

## Tecnologias utilizadas

- React Native
- Cloud Firestore
- Cloud Storage for Firebase
- Azure Cognitive Services
- API de Autenticação (um projeto a parte)

## Sobre

Esta é uma aplicação mobile que integra serviços de bucket de imagens, banco de dados e processamento de imagens.

## Intuito

A aplicação foi feita para facilitar o autoatendimento de chamados de TI.
O usuário envia fotos suas para o servidor que, por sua vez, fará o processamento da imagem para identificar o rosto presente na foto e associá-lo ao usuário. Posteriormente, o usuário poderá autenticar-se em serviços de autoatendimento de TI apenas enviando uma foto sua (evitando problemas em casos em que o usuário esquece a senha do seu e-mail institucional, por exemplo).

## Environment

`API_KEY`: apiKey do projeto Firebase

`AUTH_DOMAIN`: authDomain do projeto Firebase

`PROJECT_ID`: projectId do projeto Firebase

`STORAGE_BUCKET`: storageBucket do projeto Firebase

`MESSAGING_SENDER_ID`: messagingSenderId do projeto Firebase

`APP_ID`: appId do projeto Firebase

`MEASUREMENT_ID`: measurementId do projeto Firebase

`FIRESTORE_COLLECTION`: nome da collection que guarda os usuários na Cloud Firestore

`AZURE_BASE_URL`: URL base do cliente Azure

`AZURE_KEY`: Chave do cliente Azure

`AUTH_BASE_URL`: URL base da API de autenticação (um projeto externo a esse)

⚡ @marcoant08