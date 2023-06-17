function listNumber(...numbers) {
    const types = numbers.map(nro => typeof nro);
    console.log(types);

    if(types.includes("string") || types.includes("boolean")) {
        console.error(`Parámetro invalido: ${types}`);
        process.exitCode = -4;
    } else {
        console.log(numbers);
    };

    process.on("exit", code => {
        if(code === -4) {
            console.log("Proceso finalizado por argumento inválido");
        };
    });
};

listNumber(1, 2, 3, 4, "cinco");