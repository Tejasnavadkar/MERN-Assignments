#! /usr/bin/env node
import dotenv from "dotenv"
dotenv.config()
import yargs from "yargs";
import chalk from "chalk";
import boxen from "boxen";
import { hideBin } from "yargs/helpers"
import { getWeatherDataService } from "../services/weather.service.js";

//chalk & boxen for styling 
const usage = chalk.magenta("\nUsage: weathercli -city <cityName> \n"
    + boxen(chalk.green("\n" + "get a weather of a city" + "\n"), { padding: 1, borderColor: 'green', dimBorder: true }) + "\n");

const options = yargs(hideBin(process.argv))  // to parse/get cmd arguments
    .usage(usage)
    .option("city", {
        alias: "cityName",
        describe: "give a city name to get weather of that city",
        type: "string",
        demandOption: true
    })
    .help(true)
    .argv

// fn to get weather of a given city
const getWeather = async () => {

    try {

        if (options.city) {
            const response = await getWeatherDataService(options.city)

            if (response.status !== 200) {
                throw new Error('api reaquest faild:')
            }

            console.log(boxen(chalk.green(`
            Weather in ${response.data?.name}:
            Temperature: ${response.data?.main?.temp}°C
            condition: ${response.data?.weather?.[0].main}
            Wind Speed: ${response.data?.wind?.speed} m/s
            Wind deg:${response.data?.wind?.deg}°
            `), { padding: 1, borderColor: 'green', dimBorder: true }));

        }

    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`))
    }

}

getWeather()
