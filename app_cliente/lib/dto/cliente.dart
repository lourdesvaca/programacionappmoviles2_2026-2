import 'dart:convert';


class Cliente {
  final int id;
  final String nombre;
  final String apellido;
  final int? telefono;
  final String correo;
  final String contrasenha;


  /*final int? duracion;
  final List<Categoria> generos;

  final String director;
  final String sinopsis;
  final String? poster;
  final String? fondo;

  final double rating;
  final int votos;

  final DateTime? fechaBusqueda;*/

  const Cliente({
    required this.id,
    required this.nombre,
    required this.apellido,
    required this.telefono,
    required this.correo,
    required this.contrasenha,
    
  });
}