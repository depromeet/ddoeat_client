import { SERVICE_TERMS, LOCATION_TERMS } from '@constants/terms';

const TERMS_MAP = {
  SERVICE_TERMS: SERVICE_TERMS,
  LOCATION_TERMS: LOCATION_TERMS,
};

interface DescriptionProps {
  type: 'SERVICE_TERMS' | 'LOCATION_TERMS';
}

export default function Description({ type }: DescriptionProps) {
  const terms = TERMS_MAP[type];
  return (
    <div className="whitespace-pre-wrap flex flex-col gap-[32px]">
      {terms.map((term, index) => (
        <div key={index} className="flex flex-col gap-[12px]">
          <h2 className="body-16-bold">{term.title}</h2>
          {term.subscription && <p>{term.subscription}</p>}
          {term.list && (
            <ul className="list-decimal flex flex-col gap-[12px]">
              {term.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
