const chatController = require('./chatController');
const Chat = require('../models/Chat');

describe('GET list messages of MongoDB', () => {
  test('When something went wrong while calling, should return a 500 and an error message', async () => {
    // Arrange
    const getOneSpy = jest
      .spyOn(Chat, 'getAll')
      .mockImplementation(() => {
        throw new Error();
      });

    const mockReq = {};

    const mockRes = { status: jest.fn(), json: jest.fn() };

    // Act
    await chatController.showChat(mockReq, mockRes);

    // Assert
    expect(getOneSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({ message: 'Algo deu errado' });
    getOneSpy.mockRestore();
  });
});
