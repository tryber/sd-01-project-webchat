const mainRepository = require('../../../infrastructure/main/mainRepository');

exports.listAll = async () => {
  try {
    const list = await mainRepository.list();
    return list;
  } catch (err) {
    console.log(err);
  }
};

exports.createMessage = async ({ nickname, message }) => {
  try {
    const webChat = new mainRepository(nickname, message);
    const result = await webChat.create();
    if (!result) throw new Error('Deu ruim nos resultados');
    console.log('Criado com sucesso!');
  } catch (err) {
    console.log(err);
  }
};
