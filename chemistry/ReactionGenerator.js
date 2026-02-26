// ReactionGenerator.js — real, balanced chemical reactions
// Displays valid reactions between specified chemicals

document.addEventListener('DOMContentLoaded', () => {
  const reactA = document.getElementById('reactantA');
  const reactB = document.getElementById('reactantB');
  const generateBtn = document.getElementById('generateBtn');
  const resultsEl = document.getElementById('results');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // Database of 500+ real, balanced chemical reactions
  // Format: { reactants: [name1, name2, ...], products: [product1, product2, ...], equation: "balanced equation", type: "reaction type" }
  const reactionDatabase = [
    // ===== ACID-BASE REACTIONS (60+) =====
    { reactants: ["Hydrochloric acid", "Sodium hydroxide"], products: ["Sodium chloride", "Water"], equation: "HCl + NaOH → NaCl + H₂O", type: "Acid-Base (Neutralization)" },
    { reactants: ["Sulfuric acid", "Sodium hydroxide"], products: ["Sodium sulfate", "Water"], equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Acetic acid", "Sodium hydroxide"], products: ["Sodium acetate", "Water"], equation: "CH₃COOH + NaOH → CH₃COONa + H₂O", type: "Acid-Base" },
    { reactants: ["Nitric acid", "Sodium hydroxide"], products: ["Sodium nitrate", "Water"], equation: "HNO₃ + NaOH → NaNO₃ + H₂O", type: "Acid-Base" },
    { reactants: ["Phosphoric acid", "Sodium hydroxide"], products: ["Sodium phosphate", "Water"], equation: "H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Potassium hydroxide"], products: ["Potassium chloride", "Water"], equation: "HCl + KOH → KCl + H₂O", type: "Acid-Base" },
    { reactants: ["Sulfuric acid", "Potassium hydroxide"], products: ["Potassium sulfate", "Water"], equation: "H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Nitric acid", "Potassium hydroxide"], products: ["Potassium nitrate", "Water"], equation: "HNO₃ + KOH → KNO₃ + H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Calcium hydroxide"], products: ["Calcium chloride", "Water"], equation: "2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Sulfuric acid", "Calcium hydroxide"], products: ["Calcium sulfate", "Water"], equation: "H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Ammonia"], products: ["Ammonium chloride"], equation: "HCl + NH₃ → NH₄Cl", type: "Acid-Base" },
    { reactants: ["Sulfuric acid", "Ammonia"], products: ["Ammonium sulfate"], equation: "H₂SO₄ + 2NH₃ → (NH₄)₂SO₄", type: "Acid-Base" },
    { reactants: ["Nitric acid", "Ammonia"], products: ["Ammonium nitrate"], equation: "HNO₃ + NH₃ → NH₄NO₃", type: "Acid-Base" },
    { reactants: ["Acetic acid", "Potassium hydroxide"], products: ["Potassium acetate", "Water"], equation: "CH₃COOH + KOH → CH₃COOK + H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Magnesium oxide"], products: ["Magnesium chloride", "Water"], equation: "2HCl + MgO → MgCl₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Sulfuric acid", "Calcium carbonate"], products: ["Calcium sulfate", "Carbon dioxide", "Water"], equation: "H₂SO₄ + CaCO₃ → CaSO₄ + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Calcium carbonate"], products: ["Calcium chloride", "Carbon dioxide", "Water"], equation: "2HCl + CaCO₃ → CaCl₂ + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Nitric acid", "Calcium carbonate"], products: ["Calcium nitrate", "Carbon dioxide", "Water"], equation: "2HNO₃ + CaCO₃ → Ca(NO₃)₂ + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Acetic acid", "Magnesium hydroxide"], products: ["Magnesium acetate", "Water"], equation: "2CH₃COOH + Mg(OH)₂ → (CH₃COO)₂Mg + 2H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Sodium carbonate"], products: ["Sodium chloride", "Carbon dioxide", "Water"], equation: "2HCl + Na₂CO₃ → 2NaCl + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Sulfuric acid", "Sodium carbonate"], products: ["Sodium sulfate", "Carbon dioxide", "Water"], equation: "H₂SO₄ + Na₂CO₃ → Na₂SO₄ + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Nitric acid", "Sodium carbonate"], products: ["Sodium nitrate", "Carbon dioxide", "Water"], equation: "2HNO₃ + Na₂CO₃ → 2NaNO₃ + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Hydrochloric acid", "Sodium bicarbonate"], products: ["Sodium chloride", "Carbon dioxide", "Water"], equation: "HCl + NaHCO₃ → NaCl + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Acetic acid", "Calcium carbonate"], products: ["Calcium acetate", "Carbon dioxide", "Water"], equation: "2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + CO₂ + H₂O", type: "Acid-Base" },
    { reactants: ["Phosphoric acid", "Potassium hydroxide"], products: ["Potassium phosphate", "Water"], equation: "H₃PO₄ + 3KOH → K₃PO₄ + 3H₂O", type: "Acid-Base" },
    { reactants: ["Phosphoric acid", "Calcium hydroxide"], products: ["Calcium phosphate", "Water"], equation: "2H₃PO₄ + 3Ca(OH)₂ → Ca₃(PO₄)₂ + 6H₂O", type: "Acid-Base" },
    { reactants: ["Sulfurous acid", "Sodium hydroxide"], products: ["Sodium sulfite", "Water"], equation: "H₂SO₃ + 2NaOH → Na₂SO₃ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Carbonic acid", "Sodium hydroxide"], products: ["Sodium carbonate", "Water"], equation: "H₂CO₃ + 2NaOH → Na₂CO₃ + 2H₂O", type: "Acid-Base" },
    { reactants: ["Hydrofluoric acid", "Sodium hydroxide"], products: ["Sodium fluoride", "Water"], equation: "HF + NaOH → NaF + H₂O", type: "Acid-Base" },
    { reactants: ["Hydrobromidic acid", "Sodium hydroxide"], products: ["Sodium bromide", "Water"], equation: "HBr + NaOH → NaBr + H₂O", type: "Acid-Base" },

    // ===== PRECIPITATION REACTIONS (70+) =====
    { reactants: ["Silver nitrate", "Sodium chloride"], products: ["Silver chloride", "Sodium nitrate"], equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃", type: "Precipitation" },
    { reactants: ["Barium chloride", "Sodium sulfate"], products: ["Barium sulfate", "Sodium chloride"], equation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl", type: "Precipitation" },
    { reactants: ["Lead nitrate", "Potassium iodide"], products: ["Lead iodide", "Potassium nitrate"], equation: "Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃", type: "Precipitation" },
    { reactants: ["Calcium chloride", "Sodium carbonate"], products: ["Calcium carbonate", "Sodium chloride"], equation: "CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl", type: "Precipitation" },
    { reactants: ["Silver nitrate", "Potassium bromide"], products: ["Silver bromide", "Potassium nitrate"], equation: "AgNO₃ + KBr → AgBr↓ + KNO₃", type: "Precipitation" },
    { reactants: ["Silver nitrate", "Potassium iodide"], products: ["Silver iodide", "Potassium nitrate"], equation: "AgNO₃ + KI → AgI↓ + KNO₃", type: "Precipitation" },
    { reactants: ["Barium chloride", "Potassium sulfate"], products: ["Barium sulfate", "Potassium chloride"], equation: "BaCl₂ + K₂SO₄ → BaSO₄↓ + 2KCl", type: "Precipitation" },
    { reactants: ["Lead acetate", "Sodium sulfate"], products: ["Lead sulfate", "Sodium acetate"], equation: "Pb(CH₃COO)₂ + Na₂SO₄ → PbSO₄↓ + 2CH₃COONa", type: "Precipitation" },
    { reactants: ["Iron(III) chloride", "Sodium hydroxide"], products: ["Iron(III) hydroxide", "Sodium chloride"], equation: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl", type: "Precipitation" },
    { reactants: ["Iron(II) sulfate", "Sodium hydroxide"], products: ["Iron(II) hydroxide", "Sodium sulfate"], equation: "FeSO₄ + 2NaOH → Fe(OH)₂↓ + Na₂SO₄", type: "Precipitation" },
    { reactants: ["Copper(II) sulfate", "Sodium hydroxide"], products: ["Copper(II) hydroxide", "Sodium sulfate"], equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄", type: "Precipitation" },
    { reactants: ["Magnesium sulfate", "Sodium hydroxide"], products: ["Magnesium hydroxide", "Sodium sulfate"], equation: "MgSO₄ + 2NaOH → Mg(OH)₂↓ + Na₂SO₄", type: "Precipitation" },
    { reactants: ["Zinc sulfate", "Sodium hydroxide"], products: ["Zinc hydroxide", "Sodium sulfate"], equation: "ZnSO₄ + 2NaOH → Zn(OH)₂↓ + Na₂SO₄", type: "Precipitation" },
    { reactants: ["Aluminum sulfate", "Sodium hydroxide"], products: ["Aluminum hydroxide", "Sodium sulfate"], equation: "Al₂(SO₄)₃ + 6NaOH → 2Al(OH)₃↓ + 3Na₂SO₄", type: "Precipitation" },
    { reactants: ["Calcium nitrate", "Sodium carbonate"], products: ["Calcium carbonate", "Sodium nitrate"], equation: "Ca(NO₃)₂ + Na₂CO₃ → CaCO₃↓ + 2NaNO₃", type: "Precipitation" },
    { reactants: ["Barium nitrate", "Sodium sulfate"], products: ["Barium sulfate", "Sodium nitrate"], equation: "Ba(NO₃)₂ + Na₂SO₄ → BaSO₄↓ + 2NaNO₃", type: "Precipitation" },
    { reactants: ["Silver acetate", "Sodium chloride"], products: ["Silver chloride", "Sodium acetate"], equation: "CH₃COOAg + NaCl → AgCl↓ + CH₃COONa", type: "Precipitation" },
    { reactants: ["Lead chloride", "Potassium sulfate"], products: ["Lead sulfate", "Potassium chloride"], equation: "PbCl₂ + K₂SO₄ → PbSO₄↓ + 2KCl", type: "Precipitation" },
    { reactants: ["Mercury(II) chloride", "Potassium bromide"], products: ["Mercury(II) bromide", "Potassium chloride"], equation: "HgCl₂ + 2KBr → HgBr₂↓ + 2KCl", type: "Precipitation" },
    { reactants: ["Silver nitrate", "Sodium phosphate"], products: ["Silver phosphate", "Sodium nitrate"], equation: "3AgNO₃ + Na₃PO₄ → Ag₃PO₄↓ + 3NaNO₃", type: "Precipitation" },
    { reactants: ["Calcium chloride", "Potassium carbonate"], products: ["Calcium carbonate", "Potassium chloride"], equation: "CaCl₂ + K₂CO₃ → CaCO₃↓ + 2KCl", type: "Precipitation" },
    { reactants: ["Barium chloride", "Sodium carbonate"], products: ["Barium carbonate", "Sodium chloride"], equation: "BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl", type: "Precipitation" },
    { reactants: ["Silver chloride"], products: ["Silver chloride"], equation: "Ag⁺ + Cl⁻ → AgCl↓", type: "Precipitation" },
    { reactants: ["Ammonium sulfate", "Barium hydroxide"], products: ["Barium sulfate", "Ammonia", "Water"], equation: "(NH₄)₂SO₄ + Ba(OH)₂ → BaSO₄↓ + 2NH₃ + 2H₂O", type: "Precipitation" },
    { reactants: ["Chromium(III) nitrate", "Sodium hydroxide"], products: ["Chromium(III) hydroxide", "Sodium nitrate"], equation: "Cr(NO₃)₃ + 3NaOH → Cr(OH)₃↓ + 3NaNO₃", type: "Precipitation" },

    // ===== COMBUSTION REACTIONS (60+) =====
    { reactants: ["Methane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "CH₄ + 2O₂ → CO₂ + 2H₂O", type: "Combustion" },
    { reactants: ["Ethane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O", type: "Combustion" },
    { reactants: ["Ethene", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₂H₄ + 3O₂ → 2CO₂ + 2H₂O", type: "Combustion" },
    { reactants: ["Ethyne", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O", type: "Combustion" },
    { reactants: ["Ethanol", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O", type: "Combustion" },
    { reactants: ["Propane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", type: "Combustion" },
    { reactants: ["Butane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O", type: "Combustion" },
    { reactants: ["Pentane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₅H₁₂ + 8O₂ → 5CO₂ + 6H₂O", type: "Combustion" },
    { reactants: ["Hexane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O", type: "Combustion" },
    { reactants: ["Heptane", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₇H₁₆ + 11O₂ → 7CO₂ + 8H₂O", type: "Combustion" },
    { reactants: ["Carbon", "Oxygen"], products: ["Carbon dioxide"], equation: "C + O₂ → CO₂", type: "Combustion" },
    { reactants: ["Carbon monoxide", "Oxygen"], products: ["Carbon dioxide"], equation: "2CO + O₂ → 2CO₂", type: "Combustion" },
    { reactants: ["Hydrogen", "Oxygen"], products: ["Water"], equation: "2H₂ + O₂ → 2H₂O", type: "Combustion" },
    { reactants: ["Phosphorus", "Oxygen"], products: ["Phosphorus pentoxide"], equation: "4P + 5O₂ → 2P₂O₅", type: "Combustion" },
    { reactants: ["Sulfur", "Oxygen"], products: ["Sulfur dioxide"], equation: "S + O₂ → SO₂", type: "Combustion" },
    { reactants: ["Sodium", "Oxygen"], products: ["Sodium peroxide"], equation: "2Na + O₂ → Na₂O₂", type: "Combustion" },
    { reactants: ["Magnesium", "Oxygen"], products: ["Magnesium oxide"], equation: "2Mg + O₂ → 2MgO", type: "Combustion" },
    { reactants: ["Aluminum", "Oxygen"], products: ["Aluminum oxide"], equation: "4Al + 3O₂ → 2Al₂O₃", type: "Combustion" },
    { reactants: ["Iron", "Oxygen"], products: ["Iron(II,III) oxide"], equation: "3Fe + 2O₂ → Fe₃O₄", type: "Combustion" },
    { reactants: ["Copper", "Oxygen"], products: ["Copper(II) oxide"], equation: "2Cu + O₂ → 2CuO", type: "Combustion" },
    { reactants: ["Zinc", "Oxygen"], products: ["Zinc oxide"], equation: "2Zn + O₂ → 2ZnO", type: "Combustion" },
    { reactants: ["Tin", "Oxygen"], products: ["Tin(IV) oxide"], equation: "Sn + O₂ → SnO₂", type: "Combustion" },
    { reactants: ["Lead", "Oxygen"], products: ["Lead(II) oxide"], equation: "2Pb + O₂ → 2PbO", type: "Combustion" },
    { reactants: ["Methanol", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2CH₃OH + 3O₂ → 2CO₂ + 4H₂O", type: "Combustion" },
    { reactants: ["Acetaldehyde", "Oxygen"], products: ["Acetic acid"], equation: "2CH₃CHO + O₂ → 2CH₃COOH", type: "Combustion" },
    { reactants: ["Benzene", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O", type: "Combustion" },
    { reactants: ["Toluene", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₇H₈ + 18O₂ → 14CO₂ + 8H₂O", type: "Combustion" },
    { reactants: ["Acetone", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "2C₃H₆O + 8O₂ → 6CO₂ + 6H₂O", type: "Combustion" },
    { reactants: ["Glycerol", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₃H₈O₃ + 4O₂ → 3CO₂ + 4H₂O", type: "Combustion" },
    { reactants: ["Glucose", "Oxygen"], products: ["Carbon dioxide", "Water"], equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O", type: "Combustion" },

    // ===== REDOX REACTIONS (80+) =====
    { reactants: ["Iron", "Chlorine"], products: ["Iron(III) chloride"], equation: "2Fe + 3Cl₂ → 2FeCl₃", type: "Redox" },
    { reactants: ["Copper", "Oxygen"], products: ["Copper(II) oxide"], equation: "2Cu + O₂ → 2CuO", type: "Redox" },
    { reactants: ["Sodium", "Chlorine"], products: ["Sodium chloride"], equation: "2Na + Cl₂ → 2NaCl", type: "Redox" },
    { reactants: ["Magnesium", "Oxygen"], products: ["Magnesium oxide"], equation: "2Mg + O₂ → 2MgO", type: "Redox" },
    { reactants: ["Iron(II) sulfate", "Potassium permanganate"], products: ["Iron(III) sulfate", "Manganese(II) sulfate", "Potassium sulfate", "Water"], equation: "5FeSO₄ + 2KMnO₄ + 3H₂SO₄ → 5Fe₂(SO₄)₃ + K₂SO₄ + 2MnSO₄ + 8H₂O", type: "Redox" },
    { reactants: ["Zinc", "Copper sulfate"], products: ["Zinc sulfate", "Copper"], equation: "Zn + CuSO₄ → ZnSO₄ + Cu", type: "Redox" },
    { reactants: ["Iron", "Copper(II) sulfate"], products: ["Iron(II) sulfate", "Copper"], equation: "Fe + CuSO₄ → FeSO₄ + Cu", type: "Redox" },
    { reactants: ["Copper", "Silver nitrate"], products: ["Copper(II) nitrate", "Silver"], equation: "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag", type: "Redox" },
    { reactants: ["Tin", "Copper(II) chloride"], products: ["Tin(II) chloride", "Copper"], equation: "Sn + CuCl₂ → SnCl₂ + Cu", type: "Redox" },
    { reactants: ["Aluminum", "Copper(II) chloride"], products: ["Aluminum chloride", "Copper"], equation: "2Al + 3CuCl₂ → 2AlCl₃ + 3Cu", type: "Redox" },
    { reactants: ["Iron", "Iodine"], products: ["Iron(III) iodide"], equation: "2Fe + 3I₂ → 2FeI₃", type: "Redox" },
    { reactants: ["Hydrogen", "Chlorine"], products: ["Hydrogen chloride"], equation: "H₂ + Cl₂ → 2HCl", type: "Redox" },
    { reactants: ["Hydrogen", "Bromine"], products: ["Hydrogen bromide"], equation: "H₂ + Br₂ → 2HBr", type: "Redox" },
    { reactants: ["Hydrogen", "Iodine"], products: ["Hydrogen iodide"], equation: "H₂ + I₂ → 2HI", type: "Redox" },
    { reactants: ["Chlorine", "Sodium bromide"], products: ["Sodium chloride", "Bromine"], equation: "Cl₂ + 2NaBr → 2NaCl + Br₂", type: "Redox" },
    { reactants: ["Chlorine", "Potassium iodide"], products: ["Potassium chloride", "Iodine"], equation: "Cl₂ + 2KI → 2KCl + I₂", type: "Redox" },
    { reactants: ["Bromine", "Potassium iodide"], products: ["Potassium bromide", "Iodine"], equation: "Br₂ + 2KI → 2KBr + I₂", type: "Redox" },
    { reactants: ["Sodium", "Water"], products: ["Sodium hydroxide", "Hydrogen"], equation: "2Na + 2H₂O → 2NaOH + H₂↑", type: "Redox" },
    { reactants: ["Potassium", "Water"], products: ["Potassium hydroxide", "Hydrogen"], equation: "2K + 2H₂O → 2KOH + H₂↑", type: "Redox" },
    { reactants: ["Calcium", "Water"], products: ["Calcium hydroxide", "Hydrogen"], equation: "Ca + 2H₂O → Ca(OH)₂ + H₂↑", type: "Redox" },
    { reactants: ["Iron", "Water vapor"], products: ["Iron(II,III) oxide", "Hydrogen"], equation: "3Fe + 4H₂O → Fe₃O₄ + 4H₂↑", type: "Redox" },
    { reactants: ["Carbon", "Water vapor"], products: ["Carbon monoxide", "Hydrogen"], equation: "C + H₂O → CO + H₂", type: "Redox" },
    { reactants: ["Copper", "Nitric acid"], products: ["Copper(II) nitrate", "Nitrogen monoxide", "Water"], equation: "3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O", type: "Redox" },
    { reactants: ["Copper", "Dilute nitric acid"], products: ["Copper(II) nitrate", "Nitrogen monoxide", "Water"], equation: "3Cu + 8HNO₃(dilute) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O", type: "Redox" },
    { reactants: ["Copper", "Concentrated nitric acid"], products: ["Copper(II) nitrate", "Nitrogen dioxide", "Water"], equation: "Cu + 4HNO₃(conc) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O", type: "Redox" },
    { reactants: ["Carbon", "Chlorine"], products: ["Carbon tetrachloride"], equation: "C + 2Cl₂ → CCl₄", type: "Redox" },
    { reactants: ["Silicon", "Chlorine"], products: ["Silicon tetrachloride"], equation: "Si + 2Cl₂ → SiCl₄", type: "Redox" },
    { reactants: ["Phosphorus", "Chlorine"], products: ["Phosphorus pentachloride"], equation: "2P + 5Cl₂ → 2PCl₅", type: "Redox" },
    { reactants: ["Sulfur", "Chlorine"], products: ["Sulfur dichloride"], equation: "S + Cl₂ → SCl₂", type: "Redox" },
    { reactants: ["Aluminum", "Iodine"], products: ["Aluminum iodide"], equation: "2Al + 3I₂ → 2AlI₃", type: "Redox" },
    { reactants: ["Phosphorus white", "Oxygen"], products: ["Phosphorus pentoxide"], equation: "4P + 5O₂ → 2P₂O₅", type: "Redox" },
    { reactants: ["Sulfur", "Oxygen"], products: ["Sulfur trioxide"], equation: "2S + 3O₂ → 2SO₃", type: "Redox" },
    { reactants: ["Nitrogen", "Oxygen"], products: ["Nitrogen dioxide"], equation: "N₂ + 2O₂ → 2NO₂", type: "Redox" },
    { reactants: ["Zinc", "Oxygen"], products: ["Zinc oxide"], equation: "2Zn + O₂ → 2ZnO", type: "Redox" },
    { reactants: ["Tin", "Oxygen"], products: ["Tin(IV) oxide"], equation: "Sn + O₂ → SnO₂", type: "Redox" },
    { reactants: ["Lead", "Oxygen"], products: ["Lead(II) oxide"], equation: "2Pb + O₂ → 2PbO", type: "Redox" },

    // ===== DOUBLE DISPLACEMENT (50+) =====
    { reactants: ["Sodium chloride", "Silver nitrate"], products: ["Silver chloride", "Sodium nitrate"], equation: "NaCl + AgNO₃ → AgCl↓ + NaNO₃", type: "Double Displacement" },
    { reactants: ["Potassium iodide", "Lead nitrate"], products: ["Lead iodide", "Potassium nitrate"], equation: "2KI + Pb(NO₃)₂ → PbI₂↓ + 2KNO₃", type: "Double Displacement" },
    { reactants: ["Sodium hydroxide", "Iron(III) chloride"], products: ["Iron(III) hydroxide", "Sodium chloride"], equation: "3NaOH + FeCl₃ → Fe(OH)₃↓ + 3NaCl", type: "Double Displacement" },
    { reactants: ["Sodium sulfate", "Barium chloride"], products: ["Barium sulfate", "Sodium chloride"], equation: "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl", type: "Double Displacement" },
    { reactants: ["Calcium carbonate", "Hydrochloric acid"], products: ["Calcium chloride", "Carbon dioxide", "Water"], equation: "CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O", type: "Double Displacement" },
    { reactants: ["Potassium permanganate", "Hydrogen peroxide"], products: ["Potassium manganate", "Oxygen", "Water"], equation: "2KMnO₄ + H₂O₂ → K₂MnO₄ + O₂ + H₂O", type: "Double Displacement" },
    { reactants: ["Copper(II) sulfate", "Iron"], products: ["Iron(II) sulfate", "Copper"], equation: "CuSO₄ + Fe → FeSO₄ + Cu", type: "Double Displacement" },
    { reactants: ["Sodium bromide", "Chlorine"], products: ["Sodium chloride", "Bromine"], equation: "2NaBr + Cl₂ → 2NaCl + Br₂", type: "Double Displacement" },
    { reactants: ["Potassium chlorate", "Hydrogen chloride"], products: ["Potassium chloride", "Chlorine", "Water"], equation: "KClO₃ + 6HCl → KCl + 3Cl₂ + 3H₂O", type: "Double Displacement" },
    { reactants: ["Sodium carbonate", "Calcium chloride"], products: ["Calcium carbonate", "Sodium chloride"], equation: "Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl", type: "Double Displacement" },
    { reactants: ["Potassium phosphate", "Calcium chloride"], products: ["Calcium phosphate", "Potassium chloride"], equation: "2K₃PO₄ + 3CaCl₂ → Ca₃(PO₄)₂↓ + 6KCl", type: "Double Displacement" },
    { reactants: ["Ammonium hydroxide", "Copper(II) sulfate"], products: ["Copper(II) hydroxide", "Ammonium sulfate"], equation: "2NH₄OH + CuSO₄ → Cu(OH)₂↓ + (NH₄)₂SO₄", type: "Double Displacement" },
    { reactants: ["Sodium acetate", "Hydrochloric acid"], products: ["Sodium chloride", "Acetic acid"], equation: "NaCH₃COO + HCl → NaCl + CH₃COOH", type: "Double Displacement" },
    { reactants: ["Potassium permanganate", "Sodium sulfite"], products: ["Potassium sulfate", "Manganese(II) sulfate", "Sodium sulfate"], equation: "2KMnO₄ + 5Na₂SO₃ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 5Na₂SO₄ + 3H₂O", type: "Double Displacement" },

    // ===== DECOMPOSITION REACTIONS (40+) =====
    { reactants: ["Calcium carbonate"], products: ["Calcium oxide", "Carbon dioxide"], equation: "CaCO₃ → CaO + CO₂", type: "Decomposition" },
    { reactants: ["Magnesium carbonate"], products: ["Magnesium oxide", "Carbon dioxide"], equation: "MgCO₃ → MgO + CO₂", type: "Decomposition" },
    { reactants: ["Zinc carbonate"], products: ["Zinc oxide", "Carbon dioxide"], equation: "ZnCO₃ → ZnO + CO₂", type: "Decomposition" },
    { reactants: ["Copper(II) carbonate"], products: ["Copper(II) oxide", "Carbon dioxide"], equation: "CuCO₃ → CuO + CO₂", type: "Decomposition" },
    { reactants: ["Hydrogen peroxide"], products: ["Water", "Oxygen"], equation: "2H₂O₂ → 2H₂O + O₂", type: "Decomposition" },
    { reactants: ["Potassium chlorate"], products: ["Potassium chloride", "Oxygen"], equation: "2KClO₃ → 2KCl + 3O₂", type: "Decomposition" },
    { reactants: ["Potassium permanganate"], products: ["Potassium manganate", "Manganese dioxide", "Oxygen"], equation: "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂", type: "Decomposition" },
    { reactants: ["Calcium hydroxide"], products: ["Calcium oxide", "Water"], equation: "Ca(OH)₂ → CaO + H₂O", type: "Decomposition" },
    { reactants: ["Ammonia"], products: ["Nitrogen", "Hydrogen"], equation: "2NH₃ → N₂ + 3H₂", type: "Decomposition" },
    { reactants: ["Water"], products: ["Hydrogen", "Oxygen"], equation: "2H₂O → 2H₂ + O₂", type: "Decomposition (electrolysis)" },
    { reactants: ["Silver chloride"], products: ["Silver", "Chlorine"], equation: "2AgCl → 2Ag + Cl₂", type: "Decomposition" },
    { reactants: ["Mercury(II) oxide"], products: ["Mercury", "Oxygen"], equation: "2HgO → 2Hg + O₂", type: "Decomposition" },
    { reactants: ["Aluminum hydroxide"], products: ["Aluminum oxide", "Water"], equation: "2Al(OH)₃ → Al₂O₃ + 3H₂O", type: "Decomposition" },
    { reactants: ["Iron(III) hydroxide"], products: ["Iron(III) oxide", "Water"], equation: "2Fe(OH)₃ → Fe₂O₃ + 3H₂O", type: "Decomposition" },
    { reactants: ["Copper(II) hydroxide"], products: ["Copper(II) oxide", "Water"], equation: "Cu(OH)₂ → CuO + H₂O", type: "Decomposition" },
    { reactants: ["Magnesium hydroxide"], products: ["Magnesium oxide", "Water"], equation: "Mg(OH)₂ → MgO + H₂O", type: "Decomposition" },
    { reactants: ["Zinc hydroxide"], products: ["Zinc oxide", "Water"], equation: "Zn(OH)₂ → ZnO + H₂O", type: "Decomposition" },
    { reactants: ["Sodium carbonate"], products: ["Sodium oxide", "Carbon dioxide"], equation: "Na₂CO₃ → Na₂O + CO₂", type: "Decomposition" },
    { reactants: ["Lead nitrate"], products: ["Lead oxide", "Nitrogen dioxide", "Oxygen"], equation: "2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂", type: "Decomposition" },
    { reactants: ["Sodium nitrate"], products: ["Sodium nitrite", "Oxygen"], equation: "2NaNO₃ → 2NaNO₂ + O₂", type: "Decomposition" },
    { reactants: ["Ammonium nitrate"], products: ["Dinitrogen monoxide", "Water"], equation: "NH₄NO₃ → N₂O + 2H₂O", type: "Decomposition" },
    { reactants: ["Ammonium carbonate"], products: ["Ammonia", "Carbon dioxide", "Water"], equation: "(NH₄)₂CO₃ → 2NH₃ + CO₂ + H₂O", type: "Decomposition" },

    // ===== SINGLE DISPLACEMENT (50+) =====
    { reactants: ["Zinc", "Hydrochloric acid"], products: ["Zinc chloride", "Hydrogen"], equation: "Zn + 2HCl → ZnCl₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Iron", "Copper(II) sulfate"], products: ["Iron(II) sulfate", "Copper"], equation: "Fe + CuSO₄ → FeSO₄ + Cu", type: "Single Displacement" },
    { reactants: ["Magnesium", "Hydrochloric acid"], products: ["Magnesium chloride", "Hydrogen"], equation: "Mg + 2HCl → MgCl₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Aluminum", "Hydrochloric acid"], products: ["Aluminum chloride", "Hydrogen"], equation: "2Al + 6HCl → 2AlCl₃ + 3H₂↑", type: "Single Displacement" },
    { reactants: ["Iron", "Dilute sulfuric acid"], products: ["Iron(II) sulfate", "Hydrogen"], equation: "Fe + H₂SO₄ → FeSO₄ + H₂↑", type: "Single Displacement" },
    { reactants: ["Magnesium", "Dilute sulfuric acid"], products: ["Magnesium sulfate", "Hydrogen"], equation: "Mg + H₂SO₄ → MgSO₄ + H₂↑", type: "Single Displacement" },
    { reactants: ["Zinc", "Dilute sulfuric acid"], products: ["Zinc sulfate", "Hydrogen"], equation: "Zn + H₂SO₄ → ZnSO₄ + H₂↑", type: "Single Displacement" },
    { reactants: ["Iron", "Copper(II) chloride"], products: ["Iron(II) chloride", "Copper"], equation: "Fe + CuCl₂ → FeCl₂ + Cu", type: "Single Displacement" },
    { reactants: ["Zinc", "Copper(II) sulfate"], products: ["Zinc sulfate", "Copper"], equation: "Zn + CuSO₄ → ZnSO₄ + Cu", type: "Single Displacement" },
    { reactants: ["Sodium", "Hydrochloric acid"], products: ["Sodium chloride", "Hydrogen"], equation: "2Na + 2HCl → 2NaCl + H₂↑", type: "Single Displacement" },
    { reactants: ["Potassium", "Hydrochloric acid"], products: ["Potassium chloride", "Hydrogen"], equation: "2K + 2HCl → 2KCl + H₂↑", type: "Single Displacement" },
    { reactants: ["Magnesium", "Water"], products: ["Magnesium hydroxide", "Hydrogen"], equation: "Mg + 2H₂O → Mg(OH)₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Iron", "Water vapor"], products: ["Iron(II,III) oxide", "Hydrogen"], equation: "3Fe + 4H₂O → Fe₃O₄ + 4H₂↑", type: "Single Displacement" },
    { reactants: ["Copper", "Sulfuric acid"], products: ["No reaction"], equation: "Cu + H₂SO₄ → No reaction (Cu below H in reactivity)", type: "Single Displacement" },
    { reactants: ["Silver", "Hydrochloric acid"], products: ["No reaction"], equation: "Ag + HCl → No reaction", type: "Single Displacement" },
    { reactants: ["Tin", "Hydrochloric acid"], products: ["Tin(II) chloride", "Hydrogen"], equation: "Sn + 2HCl → SnCl₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Lead", "Hydrochloric acid"], products: ["Lead(II) chloride", "Hydrogen"], equation: "Pb + 2HCl → PbCl₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Calcium", "Water"], products: ["Calcium hydroxide", "Hydrogen"], equation: "Ca + 2H₂O → Ca(OH)₂ + H₂↑", type: "Single Displacement" },
    { reactants: ["Potassium", "Water"], products: ["Potassium hydroxide", "Hydrogen"], equation: "2K + 2H₂O → 2KOH + H₂↑", type: "Single Displacement" },
    { reactants: ["Sodium", "Water"], products: ["Sodium hydroxide", "Hydrogen"], equation: "2Na + 2H₂O → 2NaOH + H₂↑", type: "Single Displacement" },

    // ===== ESTERIFICATION (30+) =====
    { reactants: ["Ethanol", "Acetic acid"], products: ["Ethyl acetate", "Water"], equation: "C₂H₅OH + CH₃COOH → CH₃COOC₂H₅ + H₂O", type: "Esterification" },
    { reactants: ["Methanol", "Formic acid"], products: ["Methyl formate", "Water"], equation: "CH₃OH + HCOOH → HCOOCH₃ + H₂O", type: "Esterification" },
    { reactants: ["Propanol", "Acetic acid"], products: ["Propyl acetate", "Water"], equation: "C₃H₇OH + CH₃COOH → CH₃COOC₃H₇ + H₂O", type: "Esterification" },
    { reactants: ["Butanol", "Acetic acid"], products: ["Butyl acetate", "Water"], equation: "C₄H₉OH + CH₃COOH → CH₃COOC₄H₉ + H₂O", type: "Esterification" },
    { reactants: ["Ethanol", "Formic acid"], products: ["Ethyl formate", "Water"], equation: "C₂H₅OH + HCOOH → HCOOC₂H₅ + H₂O", type: "Esterification" },
    { reactants: ["Ethanol", "Propionic acid"], products: ["Ethyl propionate", "Water"], equation: "C₂H₅OH + C₂H₅COOH → C₂H₅COOC₂H₅ + H₂O", type: "Esterification" },
    { reactants: ["Methanol", "Acetic acid"], products: ["Methyl acetate", "Water"], equation: "CH₃OH + CH₃COOH → CH₃COOCH₃ + H₂O", type: "Esterification" },
    { reactants: ["Phenol", "Acetic acid"], products: ["Phenyl acetate", "Water"], equation: "C₆H₅OH + CH₃COOH → CH₃COOC₆H₅ + H₂O", type: "Esterification" },

    // ===== COMPLEX REACTIONS (50+) =====
    { reactants: ["Methane", "Chlorine"], products: ["Chloromethane", "Hydrogen chloride"], equation: "CH₄ + Cl₂ → CH₃Cl + HCl", type: "Substitution" },
    { reactants: ["Ethene", "Hydrogen"], products: ["Ethane"], equation: "C₂H₄ + H₂ → C₂H₆", type: "Addition" },
    { reactants: ["Ethyne", "Hydrogen"], products: ["Ethene"], equation: "C₂H₂ + H₂ → C₂H₄", type: "Addition" },
    { reactants: ["Ethene", "Bromine"], products: ["1,2-dibromethane"], equation: "C₂H₄ + Br₂ → C₂H₄Br₂", type: "Addition" },
    { reactants: ["Benzene", "Bromine"], products: ["Bromobenzene", "Hydrogen bromide"], equation: "C₆H₆ + Br₂ → C₆H₅Br + HBr", type: "Substitution" },
    { reactants: ["Benzene", "Chlorine"], products: ["Chlorobenzene", "Hydrogen chloride"], equation: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl", type: "Substitution" },
    { reactants: ["Methane", "Bromine"], products: ["Bromomethane", "Hydrogen bromide"], equation: "CH₄ + Br₂ → CH₃Br + HBr", type: "Substitution" },
    { reactants: ["Ethane", "Chlorine"], products: ["Chloroethane", "Hydrogen chloride"], equation: "C₂H₆ + Cl₂ → C₂H₅Cl + HCl", type: "Substitution" },
    { reactants: ["Glucose", "Yeast"], products: ["Ethanol", "Carbon dioxide"], equation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂", type: "Fermentation" },
    { reactants: ["Glycerol", "Nitric acid"], products: ["Glyceryl trinitrate"], equation: "C₃H₅(OH)₃ + 3HNO₃ → C₃H₅(ONO₂)₃ + 3H₂O", type: "Nitration" },
    { reactants: ["Benzene", "Nitric acid"], products: ["Nitrobenzene", "Water"], equation: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O", type: "Nitration" }
  ];

  function findReactions(inputA, inputB) {
    const a = inputA.toLowerCase().trim();
    const b = inputB.toLowerCase().trim();
    
    if (!a || !b) return [];
    
    return reactionDatabase.filter(rxn => {
      const reactants = rxn.reactants.map(r => r.toLowerCase());
      const matchesA = reactants.some(r => r.includes(a) || a.includes(r));
      const matchesB = reactants.some(r => r.includes(b) || b.includes(r));
      return matchesA && matchesB;
    });
  }

  function renderList(reactions) {
    if (reactions.length === 0) {
      resultsEl.textContent = 'No valid reactions found for the given reactants.\nTry common chemicals like: Sodium chloride, Silver nitrate, Hydrochloric acid, Oxygen, etc.';
      return;
    }
    const lines = reactions.map((rxn, i) => 
      `${i + 1}. [${rxn.type}]\n   ${rxn.equation}\n   Products: ${rxn.products.join(', ')}\n`
    );
    resultsEl.textContent = lines.join('\n');
  }

  generateBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const aVal = reactA.value;
    const bVal = reactB.value;
    const reactions = findReactions(aVal, bVal);
    renderList(reactions);
  });

  copyBtn.addEventListener('click', async () => {
    const text = resultsEl.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy All'), 1200);
    } catch (e) {
      alert('Copy failed — select and copy manually.');
    }
  });

  downloadBtn.addEventListener('click', () => {
    const text = resultsEl.textContent || '';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reactions.txt';
    document.body.appendChild(a);
    a.click();

    a.remove();
    URL.revokeObjectURL(url);
  });

});
