const familyAliasMap = new Map([
  ["clh", "Halsband-Lenk"],
  ["avs", "SIKORSKI"],
]);
export const familyAlias = (id: string) => familyAliasMap.get(id);
export const givenAliasMap = new Map(
  [
    ["skc", ["Sabine Karin J.", "S. J.", "Sabine K."]],
    ["avs", ["ANDREY"]],
    ["per", ["Paul Eric"]],
  ],
);

export const alias = new Map([
  ["ANDREY|SIKORSKI", "avs"],
]);
