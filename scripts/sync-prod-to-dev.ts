import pg from 'pg';

const prodUrl = process.env.CUSTOM_DATABASE_URL;
const devUrl = 'postgresql://postgres:password@helium/heliumdb?sslmode=disable';

async function syncProdToDev() {
  const prodClient = new pg.Client({ connectionString: prodUrl });
  const devClient = new pg.Client({ connectionString: devUrl });
  
  try {
    await prodClient.connect();
    await devClient.connect();
    
    console.log('Connected to both databases');
    
    // Fetch all products from production
    const { rows: products } = await prodClient.query('SELECT * FROM products');
    console.log(`Found ${products.length} products in production`);
    
    // Clear development
    await devClient.query('DELETE FROM products');
    console.log('Cleared development database');
    
    // Insert each product with array conversion
    for (const p of products) {
      const seriesArray = p.series ? [p.series] : [];
      const subSeriesArray = p.sub_series ? [p.sub_series] : [];
      
      await devClient.query(`
        INSERT INTO products (
          id, name, model_number, description, series, brand, application, finish, material,
          wattage, dimensions, voltage, color, cri, cct, beam_angle, image, images,
          catalogue_url, technical_drawing_url, technical_drawings, sub_series,
          standard_length, diffuser_finish, diffuser_material, accessories,
          led_strip_size, installation_method, packaging_method_a_desc, packaging_method_a_spec,
          packaging_method_b_desc, packaging_method_b_spec, accessories_spec,
          mounting_track, conduction_method, maglinear_name, input_voltage, output_voltage, technical_specs
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26, $27, $28,
          $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39
        )
      `, [
        p.id, p.name, p.model_number, p.description, seriesArray, p.brand,
        p.application, p.finish, p.material, p.wattage, p.dimensions, p.voltage,
        p.color, p.cri, p.cct, p.beam_angle, p.image, p.images,
        p.catalogue_url, p.technical_drawing_url, p.technical_drawings, subSeriesArray,
        p.standard_length, p.diffuser_finish, p.diffuser_material, p.accessories,
        p.led_strip_size, p.installation_method, p.packaging_method_a_desc, p.packaging_method_a_spec,
        p.packaging_method_b_desc, p.packaging_method_b_spec, p.accessories_spec,
        p.mounting_track, p.conduction_method, p.maglinear_name, p.input_voltage, p.output_voltage, p.technical_specs
      ]);
    }
    
    // Update sequence
    await devClient.query(`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`);
    
    console.log(`Successfully synced ${products.length} products to development`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prodClient.end();
    await devClient.end();
  }
}

syncProdToDev();
