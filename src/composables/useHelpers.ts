export default function useHelpers() {
  const ucword = (value: string) => {
    return `${value.at(0)?.toUpperCase()}${value.substr(1).toLowerCase()}`;
  }

  return {ucword}
}