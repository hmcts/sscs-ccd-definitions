import { When } from '@cucumber/cucumber';
import { LapseCasePage } from '../../pages/lapsecase.page';

const lapseCase = new LapseCasePage();

When('I set FTA State to Lapsed {string}', async function (action) {
  await lapseCase.uploadResponse(action);
});
