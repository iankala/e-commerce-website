# Backend

This is the Express backend for the e-commerce project.

## Configuration

The server reads a `MONGODB_URI` environment variable from a `.env` file in the
project root. Use the connection string provided by MongoDB Atlas.

### Connection string notes

- Atlas gives two styles of URI:
  1. **SRV format** (`mongodb+srv://…`) which uses DNS SRV lookups. It is
     convenient but relies on working DNS resolution (and outbound port 53). If
     you see an error like `querySrv ECONNREFUSED` when the server starts, it
     means the DNS lookup failed. In that case either fix your network's DNS
     settings or use the standard URI below.
  2. **Standard format** (`mongodb://host1:27017,host2:27017,…/dbname?opts`)
     which hardcodes the hosts and bypasses SRV entirely. Atlas provides this
     string under "Connect -> Drivers -> Standard connection string".

Example `.env`:

```env
# use whichever string suits your environment
MONGODB_URI=mongodb+srv://user:pass@cluster0.abcd.mongodb.net/mydb?retryWrites=true&w=majority
# or
# MONGODB_URI=mongodb://user:pass@host1:27017,host2:27017/mydb?replicaSet=atlas-xyz-shard-0&authSource=admin&ssl=true
```

## Starting the server

```sh
cd Backend
npm install            # if you haven't already
node server.js
```

The process will log the type of URI in use; if the initial connection fails the
server will exit with an informative message.
