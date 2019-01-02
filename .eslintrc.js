module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
              "singleQuote": true,
              "trailingComma": "es5"
            }
        ]
    },
    "globals": {
        "MaxAPI": true
    },
    "env": {
        "jest": true
    }
};