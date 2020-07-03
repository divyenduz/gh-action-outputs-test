import fs from 'fs'

async function main() {
  fs.writeFileSync('random.txt', new Date().toISOString())
}

main()
