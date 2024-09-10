const fs = require('fs');

const component = (name) => `import styles from './${name}.module.scss';

interface ${name}Props {}

export const ${name} = ({}: ${name}Props) => {
  return <div>Hello 👋, I am a ${name} component.</div>;
};
`;

const styles = `@use '@carbon/colors';
@use '@carbon/layout';
@use '@carbon/grid';
`;

const index = (name) => `import { ${name} } from './${name}';

export default ${name}
`;

const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name.');

const dir = `./src/components/${name}/`;

if (fs.existsSync(dir)) throw new Error('A component with that name already exists.');

fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
	if (err) throw err;
}

fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler);
fs.writeFile(`${dir}/${name}.module.scss`, styles, writeFileErrorHandler);
fs.writeFile(`${dir}/index.ts`, index(name), writeFileErrorHandler);

console.log(`${name} component created successfully!`);
