using EstoqueApi.Data;
using EstoqueApi.Models;
using Microsoft.EntityFrameworkCore;
using System;

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlite("Data Source=../EstoqueApi/estoque.db")
    .Options;

using var db = new AppDbContext(options);

Console.WriteLine("=== CLI Estoque ===");

while (true)
{
    Console.WriteLine("\n1 - Listar produtos");
    Console.WriteLine("2 - Adicionar produto");
    Console.WriteLine("3 - Atualizar produto");
    Console.WriteLine("4 - Remover produto");
    Console.WriteLine("0 - Sair");
    Console.Write("> ");
    var opt = Console.ReadLine();

    if (opt == "0") break;

    switch (opt)
    {
        case "1":
            var list = await db.Products.ToListAsync();
            foreach (var p in list)
                Console.WriteLine($"{p.Id} | {p.Name} | R${p.Price} | {p.Category}");
            break;

        case "2":
            Console.Write("Nome: ");
            var n = Console.ReadLine()!;
            Console.Write("Preço: ");
            var price = decimal.Parse(Console.ReadLine()!);
            Console.Write("Categoria: ");
            var cat = Console.ReadLine();
            db.Products.Add(new Product { Name = n, Price = price, Category = cat });
            await db.SaveChangesAsync();
            Console.WriteLine("Produto adicionado!");
            break;

        case "3":
            Console.Write("ID: ");
            var id = int.Parse(Console.ReadLine()!);
            var prod = await db.Products.FindAsync(id);
            if (prod == null) { Console.WriteLine("Não encontrado!"); break; }
            Console.Write($"Novo nome ({prod.Name}): ");
            var newName = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(newName)) prod.Name = newName;
            await db.SaveChangesAsync();
            Console.WriteLine("Atualizado!");
            break;

        case "4":
            Console.Write("ID: ");
            var idDel = int.Parse(Console.ReadLine()!);
            var del = await db.Products.FindAsync(idDel);
            if (del == null) { Console.WriteLine("Não encontrado!"); break; }
            db.Products.Remove(del);
            await db.SaveChangesAsync();
            Console.WriteLine("Removido!");
            break;
    }
}
