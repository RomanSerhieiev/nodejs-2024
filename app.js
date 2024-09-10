const express = require( 'express' );
const { userService } = require( './services/user.service' );
const { userValidator } = require( './validators/user.validator' );

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.get( '/users', async (req, res) => {
  try {
    const users = await userService.get();
    if (users.length <= 0) {
      return res.status( 422 ).json( 'No user found.' );
    }

    res.send( users );
  } catch (e) {
    res.status( 500 ).send( e.message );
  }
} );

app.get( '/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await userValidator.id( userId );

    const user = await userService.getById( Number( userId ) );
    if (!user) {
      return res.status( 404 ).send( `User with ID ${userId} not found.` );
    }

    res.send( user );
  } catch (e) {
    res.status( 500 ).send( e.message );
  }
} );

app.post( '/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userValidator.name( name );
    await userValidator.email( email );
    await userValidator.password( password );

    const users = await userService.get();
    const id = users[users.length - 1].id + 1;
    const newUser = { id, name, email, password };
    users.push( newUser );
    await userService.post( users );

    res.status( 201 ).send( `User ${newUser.name} was created` );
  } catch (e) {
    res.status( 500 ).send( e.message );
  }
} );

app.put( '/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await userValidator.id( userId );

    const index = await userService.findIndex( Number( userId ) );
    await userValidator.index( index );

    const { name, email, password } = req.body;
    await userValidator.name( name );
    await userValidator.email( email );
    await userValidator.password( password );

    const users = await userService.get();
    users[index].name = name;
    users[index].email = email;
    users[index].password = password;
    await userService.post( users );

    res.status( 201 ).send( `User ${users[index].name} was updated.` );
  } catch (e) {
    res.status( 500 ).send( e.message );
  }
} );

app.delete( '/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await userValidator.id( userId );

    const index = await userService.findIndex( Number( userId ) );
    await userValidator.index( index );

    const users = await userService.get();
    users.splice( index, 1 );
    await userService.post( users );

    res.sendStatus( 204 );
  } catch (e) {
    res.status( 500 ).send( e.message );
  }
} );

app.listen( 3000, () => {
  console.log( 'Server is running on http://localhost:3000' );
} );