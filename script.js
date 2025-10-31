const apiUrl = window.location.protocol === "https:"
    ? "https://localhost:7183/api/Products"
    : "http://localhost:5137/api/Products";

async function getProducts() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Erro ao buscar produtos: ${res.status}`);
        const data = await res.json();

        const tbody = document.getElementById("products");
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum produto encontrado.</td></tr>`;
            return;
        }

        data.forEach(p => {
            tbody.innerHTML += `
        <tr id="row-${p.id}">
          <td>${p.id}</td>
          <td><input id="name-${p.id}" type="text" value="${p.name}" disabled></td>
          <td><input id="price-${p.id}" type="text" value="${formatCurrency(p.price)}" disabled></td>
          <td>
            <select id="category-${p.id}" disabled>
              ${getCategoryOptions(p.category)}
            </select>
          </td>
          <td>
            <button onclick="enableEdit(${p.id})" id="edit-${p.id}" title="Editar">✏️</button>
            <button onclick="saveProduct(${p.id})" id="save-${p.id}" title="Salvar" style="display:none;">💾</button>
            <button onclick="deleteProduct(${p.id})" title="Excluir">🗑️</button>
          </td>
        </tr>
      `;
        });
    } catch (err) {
        console.error(err);
        alert("❌ Erro ao carregar produtos. Verifique se a API está rodando.");
    }
}

async function addProduct() {
    const name = document.getElementById("name").value.trim().toUpperCase();
    const priceStr = document.getElementById("price").value;
    const category = document.getElementById("category").value.trim().toUpperCase();
    const price = parseCurrency(priceStr);

    if (!name || isNaN(price) || !category) {
        alert("⚠️ Preencha todos os campos corretamente!");
        return;
    }

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, category })
        });

        if (!res.ok) {
            const error = await res.json();
            alert(`❌ Erro ao adicionar produto: ${error.error || res.status}`);
            return;
        }

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("category").value = "";
        getProducts();
    } catch (err) {
        console.error(err);
        alert("❌ Falha ao conectar com a API.");
    }
}

function enableEdit(id) {
    const nameInput = document.getElementById(`name-${id}`);
    const priceInput = document.getElementById(`price-${id}`);
    const categorySelect = document.getElementById(`category-${id}`);

    nameInput.disabled = false;
    priceInput.disabled = false;
    categorySelect.disabled = false;

    nameInput.addEventListener("input", e => e.target.value = e.target.value.toUpperCase());
    priceInput.addEventListener("input", handlePriceMask);

    document.getElementById(`edit-${id}`).style.display = "none";
    document.getElementById(`save-${id}`).style.display = "inline";
}

async function saveProduct(id) {
    const name = document.getElementById(`name-${id}`).value.trim().toUpperCase();
    const priceStr = document.getElementById(`price-${id}`).value;
    const category = document.getElementById(`category-${id}`).value.trim().toUpperCase();
    const price = parseCurrency(priceStr);

    if (!name || isNaN(price) || !category) {
        alert("⚠️ Preencha todos os campos corretamente!");
        return;
    }

    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, price, category })
        });

        if (!res.ok) {
            const error = await res.json();
            alert(`❌ Erro ao atualizar produto: ${error.error || res.status}`);
            return;
        }

        alert("✅ Produto atualizado com sucesso!");

        document.getElementById(`name-${id}`).disabled = true;
        document.getElementById(`price-${id}`).disabled = true;
        document.getElementById(`category-${id}`).disabled = true;

        document.getElementById(`edit-${id}`).style.display = "inline";
        document.getElementById(`save-${id}`).style.display = "none";

        getProducts();
    } catch (err) {
        console.error(err);
        alert("❌ Falha ao salvar alterações.");
    }
}

async function deleteProduct(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
        const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Erro ${res.status}`);

        alert("🗑️ Produto removido!");
        getProducts();
    } catch (err) {
        console.error(err);
        alert("❌ Erro ao deletar produto.");
    }
}
function handlePriceMask(e) {
    const value = e.target.value.replace(/[^\d]/g, "");
    const num = parseFloat(value) / 100;
    e.target.value = formatCurrency(num);
}

function formatCurrency(value) {
    if (isNaN(value)) return "R$ 0,00";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function parseCurrency(str) {
    return parseFloat(str.replace(/[R$\s.]/g, "").replace(",", "."));
}

function getCategoryOptions(selected) {
    const categories = [
        "ELETRÔNICOS",
        "PERIFÉRICOS",
        "MÓVEIS",
        "ROUPAS",
        "ALIMENTOS",
        "OUTROS"
    ];

    return categories
        .map(cat => `<option value="${cat}" ${cat === selected ? "selected" : ""}>${cat}</option>`)
        .join("");
}

document.getElementById("price").addEventListener("input", handlePriceMask);
document.getElementById("name").addEventListener("input", e => e.target.value = e.target.value.toUpperCase());
getProducts();
