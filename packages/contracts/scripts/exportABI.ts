import fs from "fs";
import path from "path";

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

    export const ${name.toUpperCase()}_ABI = ${JSON.stringify(
    artifact.abi,
    null,
    2
  )};
  `;

  fs.writeFileSync(outputPath, output.trim() + "\n");
  console.log(`📦 Exported ${name} contract to ${outputPath}`);
}
