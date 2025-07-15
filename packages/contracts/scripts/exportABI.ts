import fs from "fs";

/**
 * Exports ABI, bytecode and address of a contract to be used in frontend.
 */
export function exportContractToFrontend({
  name,
  address,
  artifactPath,
  outputPath,
}: {
  name: string;
  address: string;
  artifactPath: string;
  outputPath: string;
}) {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));

  const output = `
    // THIS FILE IS AUTO-GENERATED DURING DEPLOYMENT

    export const ${name.toUpperCase()}_ADDRESS = "${address}";

    export const ${name.toUpperCase()}_BYTECODE = "${artifact.bytecode}";

    export const ${name.toUpperCase()}_ABI = ${JSON.stringify(
    artifact.abi,
    null,
    2
  )} as const;
  `;

  fs.writeFileSync(outputPath, output.trim() + "\n");
  console.log(`📦 Exported ${name} contract to ${outputPath}`);
}
