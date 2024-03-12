package lib_types

type Point struct {
	X int
	Y int
}

func Create_Point(X int, Y int) Point {
	var Temp_Point Point
	Temp_Point.X = X
	Temp_Point.Y = Y
	return Temp_Point
}