import { mrnDate } from './scannedCase';

export const sscsPeuFormData = [
  { question: 'mrn_date', answer: mrnDate() },
  { question: 'benefit_type_description', answer: 'PIP' },
  { question: 'person1_title', answer: 'Mr' },
  { question: 'person1_first_name', answer: 'Mark' },
  { question: 'person1_last_name', answer: 'Smith' },
  { question: 'person1_address_line1', answer: '999 Road Lane' },
  { question: 'person1_address_line2', answer: 'Town Name' },
  { question: 'person1_address_line3', answer: 'City Name' },
  { question: 'person1_address_line4', answer: 'County Name' },
  { question: 'person1_postcode', answer: 'DA7 5DX' },
  { question: 'person1_nino', answer: '' },
  { question: 'office', answer: '3' },
  { question: 'hearing_telephone_number', answer: '07895123456' },
  { question: 'is_hearing_type_oral', answer: 'true' },
  { question: 'is_hearing_type_paper', answer: 'false' },
  { question: 'hearing_type_telephone', answer: 'true' },
  // { question: 'hearing_type_video', answer: 'false' }
  // { question: 'hearing_type_face_to_face', answer: 'false' }
];
