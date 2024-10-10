const { v4: uuidv4 } = require('uuid');
const Room = require('../models/room');
const roomMeet = require('../repositories/roomMeet');

exports.createRoom = async (req, res) => {
    const { userId } = req.user;

    try {
        const roomId = uuidv4();
        const room = await roomMeet.createRoom(roomId, userId);
        res.json({ room });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.joinRoom = async (req, res) => {
    const { roomId } = req.body;
    const { userId } = req.user;

    try {
        const room = await roomMeet.joinRoom(roomId, userId);
        if (!room) {
            return res.status(400).json({ msg: 'Room not found' });
        }
        res.json({ room });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.listRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};