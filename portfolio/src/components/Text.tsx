import { isPlaceholder } from '../i18n';

export function Text({ value }: { value: string }) {
  return isPlaceholder(value) ? <span className="todo">{value}</span> : <>{value}</>;
}
