export default function deleteObjectProperty({ [key]: _, ...newObj }: any, key: string) {
  return newObj;
}
