import {Request, Response} from 'express';
import tryCatchBlock from '../middleware/tryCatchBlock';
import ApplicationError, {ApplicationErrorType} from '../utils/applicationError';
import CreditCard from '../models/creditCard';

const createNewCard = tryCatchBlock(async (req: Request, res: Response) => {
  const {cardNumber, cardHolderName, expirationDate, cvv} = req.body;

  if (!cardNumber || !cardHolderName || !expirationDate || !cvv) {
    throw new ApplicationError({
      message: 'All fields are required',
      type: ApplicationErrorType.VALIDATION_ERROR
    });
  }

  const newCard = new CreditCard({
    cardNumber,
    cardHolderName,
    expirationDate,
    cvv,
  });

  await newCard.save();

  res.status(201).json({
    status: 'success',
    data: {
      card: newCard,
    },
  });
});

const getAllCards = tryCatchBlock(async (req: Request, res: Response) => {
  const cards = await CreditCard.find();

  if (!cards || cards.length === 0) {
    throw new ApplicationError({
      message: 'No cards found',
      type: ApplicationErrorType.NOT_FOUND,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      cards,
    },
    message: 'Cards retrieved successfully',
  });
});

const getCardById = tryCatchBlock(async (req: Request, res: Response) => {
  const {id} = req.params;

  const card = await CreditCard.findById(id);
  if (!card) {
    throw new ApplicationError({
      message: 'Card not found',
      type: ApplicationErrorType.NOT_FOUND,
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
    message: 'Card retrieved successfully',
  });
}
);

const updateCard = tryCatchBlock(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {cardNumber, cardHolderName, expirationDate, cvv} = req.body;

  const card = await CreditCard.findByIdAndUpdate(
    id,
    {cardNumber, cardHolderName, expirationDate, cvv},
    {new: true}
  );

  if (!card) {
    throw new ApplicationError({
      message: 'Card not found',
      type: ApplicationErrorType.NOT_FOUND,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
    message: 'Card updated successfully',
  });
});

const deleteCard = tryCatchBlock(async (req: Request, res: Response) => {
  const {id} = req.params;

  const card = await CreditCard.findByIdAndDelete(id);
  if (!card) {
    throw new ApplicationError({
      message: 'Card not found',
      type: ApplicationErrorType.NOT_FOUND,
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
    message: 'Card deleted successfully',
  });
});

export {
  createNewCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};
