# Weather CLI Tool

A command-line interface tool to check weather conditions for any city using the OpenWeather API.

## Features

- Get current weather information for any city
- Shows temperature, weather conditions, and wind details
- Colorful and styled output in the terminal
- Easy to use command-line interface
- Caching mechanism using json file to reduce API calls (30-minute cache) 

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenWeather API key

## Installation Steps

1. First, create a new project directory:
```bash
mkdir weather-cli-tool
cd weather-cli-tool
```

2. Initialize the project:
```bash
npm init -y
```

3. Create the project structure:
```bash
mkdir bin
mkdir services
touch bin/index.js
touch services/weather.service.js
```

4. Update package.json with the entry points:
```json
{
  "main": "bin/index.js",
  "type": "module",
  "bin": {
    "weathercli": "./bin/index.js"
  }
}
```

5. Install required dependencies:
```bash
npm install yargs chalk boxen dotenv axios
```

6. Create a .env file in the root directory:
```env
API_KEY=your_openweather_api_key
BASE_URL=https://api.openweathermap.org
```

## Usage

After installation, you can use the CLI tool with:

```bash
weathercli -city <cityname>
```

Options:
- `-city, --cityName`: Name of the city to get weather information (required)
- `--help`: Show help information

Example:
```bash
weathercli -city London
```

## Project Structure

```
weather-cli-tool/
├── bin/
│   └── index.js        # Main CLI entry point
├── services/
│   └── weather.service.js  # Weather API service
├── .env                # Environment variables
├── package.json
└── README.md
```

## Dependencies

- `yargs`: Command-line argument parsing/get arguments from cmd like cityname etc.
- `chalk`: Terminal string styling
- `boxen`: Create boxes in the terminal
- `dotenv`: Environment variables management
- `axios`: HTTP client for API requests

## Environment Variables

Create a `.env` file with the following variables:
```env
API_KEY=your_openweather_api_key
BASE_URL=https://api.openweathermap.org
```

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Link the package locally: `npm link`
4. Run the CLI: `weathercli -city <cityname>`
