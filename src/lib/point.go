package backend

type Point struct {
	X float64
	Y float64
}

func Create_Point(X float64, Y float64) Point {
	var Temp_Point Point
	Temp_Point.X = X
	Temp_Point.Y = Y
	return Temp_Point
}