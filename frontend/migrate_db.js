import mysql from 'mysql2/promise';
import { encyclopediaData } from './src/data/encyclopediaData.js';

async function migrate() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'cilacap',
        database: 'museum_digital'
    });

    console.log("Menghapus tabel lama...");
    await conn.query("DROP TABLE IF EXISTS models");

    console.log("Membuat tabel baru yang lebih kompleks...");
    await conn.query(`
        CREATE TABLE models (
            id INT AUTO_INCREMENT PRIMARY KEY,
            main_category VARCHAR(100),
            main_category_desc TEXT,
            main_category_color VARCHAR(50),
            main_category_image VARCHAR(255),
            sub_category VARCHAR(100),
            sub_category_desc TEXT,
            sub_category_image VARCHAR(255),
            name VARCHAR(255),
            model_path VARCHAR(255),
            image VARCHAR(255),
            period VARCHAR(255),
            status VARCHAR(100),
            description_short TEXT,
            description_full TEXT,
            description_key TEXT,
            detail_diet VARCHAR(255),
            detail_lifespan VARCHAR(255),
            detail_weight VARCHAR(255),
            detail_size VARCHAR(255),
            detail_discovery_year VARCHAR(255),
            detail_taxonomy VARCHAR(255),
            stat_completeness INT,
            stat_rarity INT,
            stat_value INT
        )
    `);

    let count = 0;
    for (const mainKey in encyclopediaData) {
        const mainCat = encyclopediaData[mainKey];
        if (!mainCat.subCategories) continue;

        for (const subCat of mainCat.subCategories) {
            if (!subCat.items) continue;

            for (const item of subCat.items) {
                const q = `INSERT INTO models (
                    main_category, main_category_desc, main_category_color, main_category_image,
                    sub_category, sub_category_desc, sub_category_image,
                    name, model_path, image, period, status,
                    description_short, description_full, description_key,
                    detail_diet, detail_lifespan, detail_weight, detail_size, detail_discovery_year, detail_taxonomy,
                    stat_completeness, stat_rarity, stat_value
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                
                const values = [
                    mainCat.title || "", mainCat.desc || "", mainCat.color || "", mainCat.image || "",
                    subCat.title || "", subCat.desc || "", subCat.image || "",
                    item.name || "", item.modelPath || "", item.image || "", item.period || "", item.status || "",
                    item.description?.short || "", item.description?.full || "", item.description?.key || "",
                    item.details?.diet || "", item.details?.lifespan || "", item.details?.weight || "", item.details?.size || "", item.details?.discoveryYear || "", item.details?.taxonomy || "",
                    item.details?.stats?.completeness || 0, item.details?.stats?.rarity || 0, item.details?.stats?.value || 0
                ];
                
                await conn.query(q, values);
                count++;
            }
        }
    }

    console.log("SUKSES! Total " + count + " item lengkap dipindahkan ke MySQL.");
    await conn.end();
}

migrate().catch(console.error);
