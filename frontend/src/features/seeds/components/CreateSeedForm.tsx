import { NewSeedDTO, Quality, Quantity, Tag } from '../../../bindings/definitions';
import SelectMenu, { SelectOption } from '../../../components/Form/SelectMenu';
import { SubmitHandler, useForm } from 'react-hook-form';

import SimpleFormInput from '@/components/Form/SimpleFormInput';
import { enumToSelectOptionArr } from '@/utils/enum';
import useCreateSeedStore from '../store/CreateSeedStore';
import { useEffect } from 'react';

interface CreateSeedFormProps {
  onCancel: () => void;
  onSubmit: (newSeed: NewSeedDTO) => void;
}

const CreateSeedForm = ({ onCancel, onSubmit }: CreateSeedFormProps) => {
  const tags: SelectOption[] = enumToSelectOptionArr(Tag);
  const quality: SelectOption[] = enumToSelectOptionArr(Quality);
  const quantity: SelectOption[] = enumToSelectOptionArr(Quantity);

  const findAllVarieties = useCreateSeedStore((state) => state.findAllVarieties);
  const varieties = useCreateSeedStore((state) =>
    state.varieties.map((variety) => {
      return { value: variety.id, label: variety.species };
    }),
  );

  useEffect(() => {
    // This is a small workaround so it's possible to use async/await in useEffect
    const _findAllVarieties = async () => {
      await findAllVarieties();
    };

    _findAllVarieties();
  }, []);

  const { register, handleSubmit, control, setValue } = useForm<NewSeedDTO>();
  const onFormSubmit: SubmitHandler<NewSeedDTO> = async (data) => {
    if (data.origin === '') delete data.origin;
    if (data.taste === '') delete data.taste;
    if (data.yield_ === '') delete data.yield_;
    if (data.use_by === '') delete data.use_by;
    if (Number.isNaN(data.generation)) delete data.generation;
    if (Number.isNaN(data.price)) delete data.price;
    if (data.use_by) {
      // Change the date to YYYY-MM-DD format so it can be parsed by the backend
      data.use_by = new Date(String(data.use_by)).toISOString().split('T')[0];
    }

    onSubmit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-6 grid gap-8 md:grid-cols-2">
          <SimpleFormInput
            type="number"
            labelText="Bezugsjahr"
            placeHolder="2023"
            required={true}
            id="harvest_year"
            register={register}
          />
          <SelectMenu
            id="tags"
            control={control}
            isMulti={true}
            options={tags}
            labelText="Kategorie"
            required={true}
            handleOptionsChange={(option) => {
              const temp = option as SelectOption[];
              const mapped = temp.map((element) => element.value as Tag);
              setValue('tags', mapped);
            }}
          />
          <SimpleFormInput
            labelText="Art"
            placeHolder="Feldsalat"
            required={true}
            id="name"
            register={register}
          />
          <SelectMenu
            id="variety_id"
            control={control}
            options={varieties}
            labelText="Sorte"
            required={true}
            handleOptionsChange={(option) => {
              setValue('variety_id', Number(option.value));
            }}
          />
          <SelectMenu
            id="quantity"
            control={control}
            options={quantity}
            labelText="Menge"
            required={true}
            handleOptionsChange={(option) => {
              const temp = option as SelectOption;
              const mapped = temp.value as Quantity;
              setValue('quantity', mapped);
            }}
          />
          <SimpleFormInput
            labelText="Herkunft"
            placeHolder="Billa"
            id="origin"
            register={register}
          />
          <SimpleFormInput
            type="date"
            labelText="Verbrauch bis"
            placeHolder="Verbrauch bis"
            id="use_by"
            register={register}
          />
          <SelectMenu
            id="quality"
            control={control}
            options={quality}
            labelText="Qualität"
            handleOptionsChange={(option) => {
              const temp = option as SelectOption;
              const mapped = temp.value as Quality;
              setValue('quality', mapped);
            }}
          />
          <SimpleFormInput
            labelText="Geschmack"
            placeHolder="nussig"
            id="taste"
            register={register}
          />
          <SimpleFormInput labelText="Ertrag" placeHolder="1" id="yield_" register={register} />
          <SimpleFormInput
            labelText="Preis"
            placeHolder="2,99€"
            id="price"
            register={register}
            valueAsNumber={true}
            errorTitle="Der Preis muss eine Zahl sein. z.B. 2,99"
          />
          <SimpleFormInput
            type="number"
            labelText="Generation"
            placeHolder="0"
            id="generation"
            register={register}
          />
        </div>
        <div className="mb-6">
          <SimpleFormInput
            isArea={true}
            labelText="Notizen"
            placeHolder="..."
            id="notes"
            register={register}
          />
        </div>
        <div className="flex flex-row justify-between space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="max-w-[240px] grow rounded-lg border border-zinc-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="max-w-[240px] grow rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Eintragen
            {useCreateSeedStore((state) => state.isUploadingSeed) && (
              <svg
                className="ml-4 inline-block h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSeedForm;