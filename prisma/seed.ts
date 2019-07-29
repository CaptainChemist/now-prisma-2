import Photon from '@generated/photon'
const photon = new Photon()

async function main() {
  // const user1 = await photon.users.create({
  //   data: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //   },
  // })
  // const user2 = await photon.users.create({
  //   data: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //   },
  // })
  // console.log({ user1, user2 })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
